const data = require('./config/config.json');
const express = require('express');
const route = require('./employee/routes.js')
const err = require('./utility/error_handler.js')
const app = express();
const thirdPartyRouter = require('./employee/thirdPartyRoutes.js')

app.use(express.json())
app.use(thirdPartyRouter)
app.use(route)
app.use(err.error)


app.listen(5000, () => { console.log(`running on port http://${data['host']}:${data['port']}`) });