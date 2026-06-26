// Importo joi para validar esquemas
const Joi = require("joi");
// importo objectId para validar id con formato mongo
const { objectId } = require("./validador");

const commentSchema = Joi.object({

    text: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "El comentario no puede estar vacío",
            "any.required": "El comentario es obligatorio"
        }),

    post: objectId.required(),

    author: objectId.required()

});


// Exporto el validador de esquema para usarlo en las rutas
module.exports = { commentSchema };