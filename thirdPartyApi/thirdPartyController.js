const axios = require('axios');
const { json } = require('body-parser');
const node_fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();
const data = require('../config/config.json');
const { response } = require('../utility/responseStructure.js');


client.on("error", function(error) {
    console.error(error);
  });


const postalWithAxiom = async (req, res, next) => {
    let { postalCode } = req.params
    let url = `https://api.postalpincode.in/pincode/` + postalCode


    try {

        const data = await axios.get(url)
        const result=JSON.stringify(data.data[0])
        client.setex(postalCode,10,result)
        res.status(200).send(data.data[0]).end()

    }
    catch (e) {
        next(e)
    }

}


const postalWithNodeFetch = async (req, res, next) => {
    let { postalCode } = req.params;
    let url = `https://api.postalpincode.in/pincode/` + postalCode

    await node_fetch(url)
        .then(respond => respond.json())
        .then((result) =>{ //console.log(result[0]);
                           let data=JSON.stringify(result[0]);
                            client.setex(postalCode,10,data);
                            res.status(200).send(result[0]).end();
                        })
        .catch(err => next(err));


}

const checkRedis = async(req,res,next) => {
    
    let key = req.params.postalCode;

    const client = redis.createClient([
        data.redisHost,
        data.redisPort
    ]); 

    client.get(key,(err,data)=>{
        if(err){
            next(err);
        }
        else if(data!=null){
            let parsedData = JSON.parse(data);
            let resp = response(parsedData,true);
            res.status(200).send(resp);
        }
        else{
            next();
        }
    });

}


module.exports = { postalWithAxiom, postalWithNodeFetch , checkRedis };