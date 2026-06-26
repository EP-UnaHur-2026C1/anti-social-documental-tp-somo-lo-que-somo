const Joi = require("joi");

//throw new Error("ESTOY EN userUpdateSchema");

const userUpdateSchema = Joi.object({
    nickname: Joi.string().min(3).max(20),
    email: Joi.string().email()
}).min(1);

module.exports = { userUpdateSchema };