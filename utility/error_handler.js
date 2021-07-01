const response_structure = require('./response_structure.js')

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }

}

const error = (err, req, res, next) => {
    let result = {}
    if (err instanceof ValidationError) {
        result = response_structure.response([], false, "raman" + err.message)
    }
    else if (err instanceof Error) {
        result = response_structure.response([], false, err.message)

    }
    res.status(400).send(result)
}





module.exports = { error, ValidationError }