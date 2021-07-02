const express = require('express')
const thirdPartyRouter = express.Router()
const controller = require('./thirdPartyController.js')


thirdPartyRouter.get('/thirdPartyApi/axios/:postalCode', controller.postalWithAxiom)
thirdPartyRouter.get('/thirdPartyApi/node_fetch/:postalCode', controller.postalWithNodeFetch)




module.exports = thirdPartyRouter