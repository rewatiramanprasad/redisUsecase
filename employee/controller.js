const sqlcontroller=require('./Sqlcontroller.js')
const response_structure=require('../utility/response_structure.js')
const validation=require('./validation.js')
const home=(req,res)=>{res.send("Hello server")}

const get_all=async (req,res,next)=>{
    try{
    let result=await sqlcontroller.get_all(next)
    result=response_structure.response(result,true)
    res.status(200).send(result)
    }
    catch(e){
        next(e)
    }
  }


const get_by_id=async(req,res,next)=>{
    const {id}=req.body
    const valid=validation.isValidGetById(req.body)
    if(valid.error){
        next(valid.error)
         }
    else{
        try{
    
            let  result=await sqlcontroller.get_by_id(id)
            result=response_structure.response(result,true)
            res.status(200).send(result)
        }
        catch(e){
            next(e)
        }
    }
}


const add_employee= async(req,res,next)=>{
    const {id,name,department,active,gender,role_id}=req.body
    let value=[id,name,department,Number(active),gender,role_id]
    const valid=validation.isValidInsertion(req.body)
    if(valid.error){
        next(valid.error)
    }
    else{
        try{
            let result=await sqlcontroller.add_employee(value)
            if (result.length==0){
                result=response_structure.response(result,true,'insert data sucessfully' )
                res.status(200).send(result)
            }
        }
        catch(e){
            next(e)
        }
    }

}
    


const update_employee=async(req,res,next)=>{
    const {id,columname,newvalue}=req.body
    const valid=validation.isValidUpdateId(req.body)
    if (valid.error){
        next(valid.error)
    }
    else{
        try{
            let result= await sqlcontroller.update_employee(columname,newvalue,id)
            if (result.rowCount==1){
                result=response_structure.response(result.rows,true,'update data sucessfully' )
                res.status(200).send(result)
            }
            
        }
        catch(e){
            next(e)
        }
    }
}

const delete_employee=async(req,res,next)=>{
    const {id}=req.body
    const valid=validation.isValidGetById(req.body)
    if(valid.error){
        next(valid.error)
        }
    else{
        try{
            let result= await sqlcontroller.delete_employee(id)
            if (result.rowCount==1){
                result=response_structure.response(result.rows,true,'delete data sucessfully' )
                res.status(200)
                res.send(result)
                res.end()
            }
        }
        catch(e){
            next(e)
        }
    }
    
}



 module.exports={home,get_all,get_by_id,add_employee,update_employee,delete_employee}