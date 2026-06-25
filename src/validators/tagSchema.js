const Joi = require('joi')

const tagSchema = Joi.object({
    name: Joi.string().min(1).max(20).required().messages({
        "string.empty": "El tag no puede estar vacio",
        "string.min": "El tag debe tener minimo 1 caracter",
        "string.max": "El tag puede tener maximo 20 caracteres"
    }),

});

module.exports = {tagSchema};