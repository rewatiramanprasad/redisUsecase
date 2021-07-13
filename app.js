const data = require('./config/config.json');
const express = require('express');
const err = require('./utility/errorHandler.js')
const app = express();
const thirdPartyRouter = require('./thirdPartyApi/thirdPartyRoutes.js')

app.use(express.json())
app.use(thirdPartyRouter)
app.use(err.error)


app.listen(data.port, () => { console.log(`running on port http://${data['host']}:${data['port']}`) });