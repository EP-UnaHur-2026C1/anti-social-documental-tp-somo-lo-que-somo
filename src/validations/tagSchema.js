const Joi = require("joi");

const tagSchema = Joi.object({

    name: Joi.string()
        .trim()
        .min(1)
        .max(20)
        .required()
        .messages({
            "string.empty": "El tag no puede estar vacío",
            "string.min": "El tag debe tener mínimo 1 caracter",
            "string.max": "El tag puede tener máximo 20 caracteres",
            "any.required": "El nombre del tag es obligatorio"
        })

});

module.exports = { tagSchema };