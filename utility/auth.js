const jwt = require('jsonwebtoken');

const authentication = async (email, secretkey) => {
    // console.log(email,secretkey);

    let token = jwt.sign({ email }, secretkey)
    data = { token: token }
    return data
}


module.exports = { authentication }