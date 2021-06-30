const express = require('express')
const sqlcontroller = require('./Sqlcontroller.js')
const controller = require('./controller.js')
const router = express.Router()


router.get('/', controller.home)
router.get('/get_all', controller.get_all)
router.get('/get_by_id', controller.get_by_id)
router.post('/add_employee', controller.add_employee)
router.put('/update_employee', controller.update_employee)
router.delete('/delete_employee', controller.delete_employee)



module.exports = router