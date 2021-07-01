const express = require('express')
const controller = require('./controller.js')
const router = express.Router()

const sqlcontroller = require('./Sqlcontroller.js')
const response_structure = require('../utility/response_structure.js')
const validation = require('./validation.js')




router.get('/login', controller.login)
router.get('/get_all', controller.getAll)
router.get('/get_by_id', controller.getById)
router.post('/add_employee', controller.addEmployee)
router.put('/update_employee', controller.updateEmployee)
router.delete('/delete_employee', controller.deleteEmployee)

// //third party api
// //http://localhost:5000/thirdPartyApi/home
// router.get('/thirdPartyApi/home',(req,res,next)=>{
// res.send('im third party api')
// })

// //http://localhost:5000/thirdPartyApi/getAll
// router.get('/thirdPartyApi/getAll',async (req,res,next)=>{
//     try {

//         let result = await sqlcontroller.getAll(next)
//         result = response_structure.response(result, true)
//         res.status(200).send(result)
//     }
//     catch (e) {
//         next(e)
//     }
//     })
// //http://localhost:5000/thirdPartyApi/getById/D002
// router.get('/thirdPartyApi/getById/:id',async (req,res,next)=>{
//     const { id } = req.params

//     try {
//         const valid = validation.isValidGetById(req.params, next)
//         let result = await sqlcontroller.get_by_id(id)
//         result = response_structure.response(result, true)
//         res.status(200).send(result)
//     }
//     catch (e) {
//         next(e)
//     }
//         })

// router.get('/thirdPartyApi/addEmployee/:id/:name/:department/:active/:gender/:role_id',async (req,res,next)=>{
//     const { id, name, department, active, gender, role_id } = req.params
//     let value = [id, name, department, Number(active), gender, role_id]

//     try {
//        console.log(req.params)
//         const valid = validation.isValidInsertion(req.params,next)
//         let data = await sqlcontroller.add_employee(value,next)
//         result = response_structure.response([], false,)
//         if (data.length == 0) {
//         result = response_structure.response([], true, 'insert data successfully')

//         }


//         res.status(200).send(result)
//     }
//     catch (e) {
//         next(e)
//     }
// })




module.exports = router