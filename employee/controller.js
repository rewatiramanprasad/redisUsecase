const sqlcontroller = require('./Sqlcontroller.js')
const response_structure = require('../utility/response_structure.js')
const validation = require('./validation.js')
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js')
const privateData = require('../config/config.json')
const auth = require('../utility/auth.js')

const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const valid = await validation.isValidLoginCredential(req.body, next)
        const password_md5Hash = crypto.MD5(password);
        console.log(password_md5Hash);
        let result = await sqlcontroller.login(email, "" + password_md5Hash, next)
        let data = []
        let flag = true
        let message = 'wrong combination of username and password'
        if (result.length == 1) {

            data = await auth.authentication(email, privateData['secret-key'])
            flag = true
            message = 'token created successfully'
        }
        result = response_structure.response(data, flag, message)
        res.status(200).send(result).end()


    }
    catch (e) {
        next(e)
    }

}


const getAll = async (req, res, next) => {
    try {
        // let token=req.body['Authorization']
        let token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, privateData['secret-key']);
        let result = await sqlcontroller.getAll(next)
        result = response_structure.response(result, true, '', decoded.email)
        res.status(200).send(result)
    }
    catch (e) {
        next(e)
    }
}


const getById = async (req, res, next) => {
    const { id } = req.body
    const valid = validation.isValidGetById(req.body, next)

    try {
        let token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, privateData['secret-key']);
        let result = await sqlcontroller.get_by_id(id)
        result = response_structure.response(result, true, '', decoded.email)
        res.status(200).send(result)
    }
    catch (e) {
        next(e)
    }

}


const addEmployee = async (req, res, next) => {
    const { id, name, department, active, gender, role_id } = req.body
    let value = [id, name, department, Number(active), gender, role_id]



    try {
        let token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, privateData['secret-key']);
        const valid = validation.isValidInsertion(req.body)
        let result = await sqlcontroller.add_employee(value)
        let flag = false
        let message = ''
        let data = []
        if (result.length == 0) {
            message = 'insert data sucessfully'
            flag = true
            data = result

        }

        result = response_structure.response(data, flag, message, decoded.email)
        res.status(200).send(result)
    }
    catch (e) {
        next(e)
    }


}



const updateEmployee = async (req, res, next) => {
    const { id, columname, newvalue } = req.body


    try {
        let token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, privateData['secret-key']);
        const valid = validation.isValidUpdateId(req.body)
        let result = await sqlcontroller.updateEmployee(columname, newvalue, id)
        let flag = false
        let message = 'already updated'
        let data = []
        if (result.rowCount == 1) {
            flag = false
            message = 'update data sucessfully'
            data = result.rows
        }
        result = response_structure.response(data, flag, message, decoded.email)
        res.status(200).send(result).end()

    }
    catch (e) {
        next(e)
    }

}

const deleteEmployee = async (req, res, next) => {
    const { id } = req.body
    try {
        const valid = validation.isValidDeleteId(req.body, next)
        let token = req.headers.authorization.split(' ')[1];
        let decoded = jwt.verify(token, privateData['secret-key']);
        let result = await sqlcontroller.deleteEmployee(id)
        let flag = true
        let message = 'already deleted'
        let data = []
        if (result.rowCount == 1) {
            flag = true
            message = 'delete data sucessfully'
            data = result.rows
        }
        console.log(decoded.email);
        result = response_structure.response(data, flag, message, decoded.email)
        res.status(200).send(result).end()
    }
    catch (e) {
        next(e)
    }


}



module.exports = { login, getAll, getById, addEmployee, updateEmployee, deleteEmployee }