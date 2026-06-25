const Joi = require("joi");

const postSchema = Joi.object({
    description: Joi.string().required(),
    userId: Joi.number().integer().required(),
    tagIds: Joi.array().items(Joi.number().integer()).optional()
});

module.exports = postSchema;