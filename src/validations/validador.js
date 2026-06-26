// Importo joi para validar esquemas
const Joi = require("joi");
// Defino una validacion que me sirven para los id's de mongo
const objectId = Joi.string()
    .length(24)
    .hex();

module.exports = {
    objectId
};