const Joi = require("joi");

const commentSchema = Joi.object({
    text: Joi.string().required(),
    postId: Joi.number().required(),
    userId: Joi.number().required()
});

module.exports = { commentSchema };