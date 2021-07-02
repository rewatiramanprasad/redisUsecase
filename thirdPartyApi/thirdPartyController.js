const axios = require('axios')
const node_fetch = require('node-fetch');


const postalWithAxiom = async (req, res, next) => {
    let { postalCode } = req.params
    let url = `https://api.postalpincode.in/pincode/` + postalCode


    try {
        const data = await axios.get(url)
        console.log(data);
        res.send(data.data[0])
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
        .then(result => res.status(200).send(result[0]))
        .catch(err => next(err));


}




module.exports = { postalWithAxiom, postalWithNodeFetch }