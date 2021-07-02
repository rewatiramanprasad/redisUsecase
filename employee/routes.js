const express = require('express')
const controller = require('./controller.js')
const router = express.Router()


router.get('/login', controller.login)
router.get('/get_all', controller.getAll)
router.get('/get_by_id', controller.getById)
router.post('/add_employee', controller.addEmployee)
router.put('/update_employee', controller.updateEmployee)
router.delete('/delete_employee', controller.deleteEmployee)


module.exports = router