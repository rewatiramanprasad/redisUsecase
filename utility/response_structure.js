function response(result,flag,message='') {
    let response={
        sucess:false,
        data:[],
        message:"failed"
    }
    if (flag==true){
        response.data=result
        response.message=result.length+" rows fetched"
        response.sucess=flag
        if (message.length!=0){
            response.message=message
        }

    }
    if (message.length!=0){
        response.message=message
    }

    return response
    
}
module.exports={response}