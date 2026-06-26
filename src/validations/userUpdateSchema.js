const Joi = require("joi");

//throw new Error("ESTOY EN userUpdateSchema");

const userUpdateSchema = Joi.object({
    nickname: Joi.string().min(3).max(20),
    email: Joi.string().email()
}).min(1);

// Exporto el validador de esquema para usarlo en las rutas
module.exports = { userUpdateSchema };