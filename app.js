const data = require('./config/config.json');
const express = require('express');
const route = require('./employee/routes.js')
const err=require('./utility/error_handler.js')
const app = express();

app.use(express.json())
app.use(route)

app.use((req,res,next)=>{
    const err=new Error("not found")
    //err.status=404
    next(err.message)
})
//err handler
app.use(err.error)
app.listen(5000, () => { console.log(`running on port http://${data['host']}:${data['port']}`) });