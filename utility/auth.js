const jwt = require('jsonwebtoken');
const { ValidationError } = require('./errorHandler');


const authentication = async (email, secretkey) => {
    // console.log(email,secretkey);

    let token = jwt.sign({ email }, secretkey,{ expiresIn: '30000' })
    data = { token: token }
    return data
}

const isTokenExist=(token,next)=>{

    if (token){
        return token.split(' ')[1]
    }
    else{
        next(new ValidationError('plz proide token'))
    }

}


module.exports = { authentication,isTokenExist }