const response_structure=require('./response_structure.js')

class handler extends Error{
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }

}

// class PropertyRequiredError extends ValidationError {
//     constructor(property) {
//       super("No property: " + property);
//       this.name = "PropertyRequiredError";
//       this.property = property;
//     }
// }


const error=(err,req,res,next)=>{
    let result={}
    if (err instanceof Error){
        result=response_structure.response([],false,err.message)
        
    }
    res.status(400).send(result)
}





module.exports={error}