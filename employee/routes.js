const express = require('express')
const controller = require('./controller.js')
const router = express.Router()


router.get('/login', controller.login)
router.get('/getAll', controller.getAll)
router.get('/getById', controller.getById)
router.post('/addEmployee', controller.addEmployee)
router.put('/updateEmployee', controller.updateEmployee)
router.delete('/deleteEmployee', controller.deleteEmployee)


module.exports = router