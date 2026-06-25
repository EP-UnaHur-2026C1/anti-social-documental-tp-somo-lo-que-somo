const Joi = require("joi");

const objectId = Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("debe ser un ObjectId válido (24 caracteres hexadecimales)");

module.exports = { objectId };