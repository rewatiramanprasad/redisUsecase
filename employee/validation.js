const Joi = require('joi');

const isValidGetById=(data)=>{
    const schema = Joi.object({
        id: Joi.string()
        .pattern(new RegExp('D{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required()})
  return  schema.validate(data)       

}

const isValidDeleteId=(data)=>{
    const schema = Joi.object({
        id: Joi.string()
        .pattern(new RegExp('E{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required()})
  return  schema.validate(data)       

}
const isValidUpdateId=(data)=>{
    const schema = Joi.object({columname:Joi.string().required(),
        newvalue:Joi.string().required(),
        id: Joi.string()
        .pattern(new RegExp('E{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required()})
  return  schema.validate(data)       

}
const isValidInsertion=(data)=>{
    const schema = Joi.object({
        id: Joi.string()
            .pattern(new RegExp('E{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required(),
        name:Joi.string().required(),
        department: Joi.string()
        .pattern(new RegExp('D{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required(),
        gender:Joi.string().required().pattern(new RegExp('M|F')),
        active:Joi.string().required(),
        role_id: Joi.string()
        .pattern(new RegExp('R{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required()
        })
  return  schema.validate(data)       

}
module.exports={isValidGetById,isValidDeleteId,isValidUpdateId,isValidInsertion}