const axios = require('axios');
const { json } = require('body-parser');
const node_fetch = require('node-fetch');
<<<<<<< HEAD
const redis = require("redis");
const client = redis.createClient();


client.on("error", function(error) {
    console.error(error);
  });

=======
const redis = require('redis');
const data = require('../config/config.json');
const { response } = require('../utility/responseStructure.js');
>>>>>>> 28ca3a506dbe65bb36b79a28ba8760b1773c92a2

const postalWithAxiom = async (req, res, next) => {
    let { postalCode } = req.params
    let url = `https://api.postalpincode.in/pincode/` + postalCode


    try {

        const data = await axios.get(url)
        const result=JSON.stringify(data.data[0])
        client.set(postalCode,result,redis.print)
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
                            client.set(postalCode,data,redis.print);
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