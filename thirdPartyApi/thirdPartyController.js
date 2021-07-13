const axios = require('axios')
const node_fetch = require('node-fetch');
const redis = require('redis');
const data = require('../config/config.json');
const { response } = require('../utility/responseStructure.js');

const postalWithAxiom = async (req, res, next) => {
    let { postalCode } = req.params
    let url = `https://api.postalpincode.in/pincode/` + postalCode


    try {
        console.log('in api call');
        const data = await axios.get(url);
        res.send(data.data[0])
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
        .then(result => res.status(200).send(result[0]))
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