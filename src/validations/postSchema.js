const Joi = require("joi");
const { objectId } = require("./validador");
//defino la estructura del id de monogodb ya que los id's ya no son numericos

const postSchema = Joi.object({
    description: Joi.string()
        .trim()
        .required(),

    author: objectId.required(),

    tagIds: Joi.array()
        .items(objectId)
        .optional()
});


module.exports = postSchema;