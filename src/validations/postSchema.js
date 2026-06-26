// Importo joi para validar esquemas
const Joi = require("joi");
// importo objectId para validar id con formato mongo
const { objectId } = require("./validador");

const postSchema = Joi.object({
    description: Joi.string()
        .trim()
        .required(),

    author: objectId.required(),

    tagIds: Joi.array()
        .items(objectId)
        .optional(),

    images: Joi.array()
        .items(
            Joi.object({
                imageUrl: Joi.string()
                    .uri()
                    .required()
            })
        )
        .optional()
});

module.exports = postSchema;