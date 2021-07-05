const sqlController = require('./sqlController.js')
const responseStructure = require('../utility/responseStructure.js')
const validation = require('./validation.js')
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js')
const privateData = require('../config/config.json')
const auth = require('../utility/auth.js')

const login = async (req, res, next) => {
    
    try {
        const { emp_id, password } = req.body
        const valid = await validation.isValidLoginCredential(req.body, next)
        const passwordMd5Hash = crypto.MD5(password);
        let data = await sqlController.login(emp_id, "" + passwordMd5Hash, next)
        if (data.length == 1) {
           const token = await auth.authentication(emp_id, privateData['secret-key'])
           const result = responseStructure.response(token, true, "token created successfully")
           res.status(400).send(result).end()
        }
        


    }
    catch (e) {
        next(e)
    }

}


const getAll = async (req, res, next) => {
    try {
        let token= auth.isTokenExist(req.headers.authorization,next)
        if (token){
        const decoded = jwt.verify(token, privateData['secret-key']);
        let result = await sqlController.getAll(next)
        result = responseStructure.response(result, true, '')
        res.status(200).send(result)
        }
    }
    catch (e) {
        next(e)
    }
}


const getById = async (req, res, next) => {
    const { id } = req.body
    const valid = validation.isValidGetById(req.body, next)

    try {
        let token= auth.isTokenExist(req.headers.authorization,next)
        if (token){
        var decoded = jwt.verify(token, privateData['secret-key']);
        let result = await sqlController.getById(id)
        result = responseStructure.response(result, true)
        res.status(200).send(result)
        }
    }
    catch (e) {
        next(e)
    }

}


const addEmployee = async (req, res, next) => {
    const { id, name, department, active, gender, role_id } = req.body
    let value = [id, name, department, Number(active), gender, role_id]



    try {
        let token= auth.isTokenExist(req.headers.authorization,next)
        if (token){
            jwt.verify(token, privateData['secret-key']);
            let valid = await validation.isValidInsertion(req.body,next)
            if (!valid.error){
            let result = await sqlController.addEmployee(value)
            if (result.length == 0) {
            
                result = responseStructure.response([],true,'data inserted sucessfully')
                res.status(200).send(result)

            }
                
            }

        }
    }
    catch (e) {
        next(e)
    }


}



const updateEmployee = async (req, res, next) => {
    const { id, columname, newvalue } = req.body


    try {
        let token= auth.isTokenExist(req.headers.authorization,next)
        if (token){
        var decoded = jwt.verify(token, privateData['secret-key']);
        const valid = validation.isValidUpdateId(req.body,next)
        let result = await sqlController.updateEmployee(columname, newvalue, id)
        if (result.rowCount == 1) {
            result = responseStructure.response([], true, 'data updated successfully')
        res.status(200).send(result).end()
        }
        
    }
    }
    catch (e) {
        next(e)
    }

}

const deleteEmployee = async (req, res, next) => {
    const { id } = req.body
    try {
        const valid = validation.isValidDeleteId(req.body, next)

        let token= auth.isTokenExist(req.headers.authorization,next)
        if (token){
        let decoded = jwt.verify(token, privateData['secret-key']);
        let data = await sqlController.deleteEmployee(id)
        result = responseStructure.response([], true, 'already deleted')

        if (data.rowCount == 1) {
            result = responseStructure.response(result.rows, true, 'delete data successfully')
        }
        res.status(200).send(result).end()
    }
    }
    catch (e) {
        next(e)
    }


}



module.exports = { login, getAll, getById, addEmployee, updateEmployee, deleteEmployee }