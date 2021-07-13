function response(result, flag, message = '', user = '') {
    let response = {
        sucess: false,
        data: [],
        message: "failed",
    }
    if (flag == true) {
        response.data = result
        response.message = "No of PostalOffices found"+result.length;
        response.sucess = flag
        if (message.length != 0) {
            response.message = message
        }
        if (user.length != 0) {
            response['user'] = user
        }


    }
    if (message.length != 0) {
        response.message = message
    }

    return response

}
module.exports = { response }