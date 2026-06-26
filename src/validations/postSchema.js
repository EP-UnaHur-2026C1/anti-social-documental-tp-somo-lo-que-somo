// Importo joi para validar esquemas
const Joi = require("joi");
// importo objectId para validar id con formato mongo
const { objectId } = require("./validador");
const postSchema = Joi.object({
    description: Joi.string().trim().required(),

    author: objectId.required(),

    tags: Joi.array()
        .items(objectId)
        .optional(),

    images: Joi.array()
        .items(
            Joi.object({
                url: Joi.string().uri().required()
            })
        )
        .optional()
});

// Exporto el validador de esquema para usarlo en las rutas
module.exports = postSchema;