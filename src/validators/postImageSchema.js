// Importo Joi para validar los datos de las imágenes de los posts
const Joi = require("joi");

// Defino el esquema de validación para las imágenes de los posts
const postImageSchema = Joi.object({
    imageUrl: Joi.string()
        .uri()
        .required()
        .messages({
            "string.empty": "La URL de la imagen no puede estar vacía",
            "string.uri": "La URL de la imagen debe ser válida",
            "any.required": "La imagen es obligatoria"
        }),

    postId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "El postId debe ser un número",
            "number.integer": "El postId debe ser un entero",
            "number.positive": "El postId debe ser mayor a 0",
            "any.required": "El postId es obligatorio"
        })
});

// Exporto el esquema para usarlo en los controladores
module.exports = { postImageSchema };