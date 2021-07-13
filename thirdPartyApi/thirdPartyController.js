const axios = require('axios');
const { json } = require('body-parser');
const node_fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();


client.on("error", function(error) {
    console.error(error);
  });


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
    let { postalCode } = req.params
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




module.exports = { postalWithAxiom, postalWithNodeFetch }