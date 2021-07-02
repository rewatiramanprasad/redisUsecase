const Joi = require('joi');
const { ValidationError } = require('../utility/errorHandler');


const isValidLoginCredential = async (data, next) => {
    console.log(data);
    const schema = Joi.object({
        email: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string().required()
        //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    try {
        const valid = await schema.validate(data)
        return
    }
    catch (e) {
        next(new ValidationError(e))
    }

}



const isValidGetById = (data, next) => {
    const schema = Joi.object({
        id: Joi.string()
            .pattern(new RegExp('D{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required()
    })
    const valid = schema.validate(data)
    if (valid.error) {
        next(new ValidationError(valid.error))
    }
    else {
        return
    }
}

const isValidDeleteId = async (data, next) => {
    const schema = Joi.object({
        id: Joi.string()
            .pattern(new RegExp('E{1}[0-9]{3}'))
            .min(4)
            .max(4)
            .required()
    })

    try {
        const valid = await schema.validate(data)
        return
    }
    catch (e) {
        next(new ValidationError(e))
    }

}
const isValidUpdateId = (data, next) => {
    const schema = Joi.object({
        columname: Joi.string().required(),
        newvalue: Joi.alternatives().try(
            Joi.string()
                .pattern(new RegExp('[E,R,D]{1}[0-9]{3}'))
                .alphanum()
                .min(4)
                .max(4)
                .required(),

            Joi.string().required().pattern(new RegExp('M|F')),

            Joi.string()),
        id: Joi.string()
            .pattern(new RegExp('E{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required()
    })
    const valid = schema.validate(data, next)
    if (valid.error) {
        next(new ValidationError(valid.error))
    }
    else {
        return
    }
}
const isValidInsertion = (data, next) => {
    const schema = Joi.object({
        id: Joi.string()
            .pattern(new RegExp('E{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required(),
        name: Joi.string().required(),
        department: Joi.string()
            .pattern(new RegExp('D{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required(),
        gender: Joi.string().required().pattern(new RegExp('M|F')),
        active: Joi.string().required(),
        role_id: Joi.string()
            .pattern(new RegExp('R{1}[0-9]{3}'))
            .alphanum()
            .min(4)
            .max(4)
            .required()
    })
    const valid = schema.validate(data)
    if (valid.error) {
        next(new ValidationError(valid.error))
    }
    else {
        return
    }
}
module.exports = { isValidGetById, isValidDeleteId, isValidUpdateId, isValidInsertion, isValidLoginCredential }