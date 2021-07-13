const express = require('express')
const thirdPartyRouter = express.Router()
const controller = require('./thirdPartyController.js')


thirdPartyRouter.get('/thirdPartyApi/axios/:postalCode',controller.checkRedis, controller.postalWithAxiom)
thirdPartyRouter.get('/thirdPartyApi/nodeFetch/:postalCode',controller.checkRedis, controller.postalWithNodeFetch)




module.exports = thirdPartyRouter