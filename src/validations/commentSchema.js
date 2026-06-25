const Joi = require("joi");
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

module.exports = { commentSchema };