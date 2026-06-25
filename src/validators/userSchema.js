// Importo Joi para validar los datos de entrada
const Joi = require('joi');

// Defino el esquema de validación para los usuarios
const userSchema = Joi.object({

    nickname: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.empty": "El nickname no puede estar vacío",
            "string.min": "El nickname debe tener mínimo 3 caracteres",
            "string.max": "El nickname puede tener máximo 20 caracteres",
            "any.required": "El nickname es obligatorio"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "El email no puede estar vacío",
            "string.email": "El email no tiene un formato válido",
            "any.required": "El email es obligatorio"
        })

});

// Exporto el esquema para usarlo en los controladores
module.exports = { userSchema };