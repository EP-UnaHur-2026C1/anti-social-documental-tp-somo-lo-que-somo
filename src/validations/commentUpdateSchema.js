// Importo Joi para validar esquemas
const Joi = require("joi");

const commentUpdateSchema = Joi.object({

    text: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "El comentario no puede estar vacío",
            "any.required": "El comentario es obligatorio"
        })

});

// Exporto el esquema
module.exports = { commentUpdateSchema };