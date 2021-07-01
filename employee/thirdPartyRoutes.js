const express = require('express')
const sqlcontroller = require('./Sqlcontroller.js')
const thirdPartyRouter = express.Router()


thirdPartyRouter.get('/thirdPartyApi/home', function (req, res) {
    res.send('hello im listening')
})
// thirdPartyRouter.get('/get_all', controller.get_all)
// thirdPartyRouter.get('/get_by_id', controller.get_by_id)
// router.post('/add_employee', controller.add_employee)
// router.put('/update_employee', controller.update_employee)
// router.delete('/delete_employee', controller.delete_employee)



module.exports = thirdPartyRouter