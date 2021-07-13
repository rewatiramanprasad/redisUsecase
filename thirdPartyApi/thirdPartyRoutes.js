const express = require('express')
const thirdPartyRouter = express.Router()
const controller = require('./thirdPartyController.js')


thirdPartyRouter.get('/thirdPartyApi/axios/:postalCode', controller.postalWithAxiom)
thirdPartyRouter.get('/thirdPartyApi/nodeFetch/:postalCode', controller.postalWithNodeFetch)




module.exports = thirdPartyRouter