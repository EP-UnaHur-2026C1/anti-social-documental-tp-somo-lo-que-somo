// Importo express y creo un router para definir las rutas de postImage
const express = require("express")
const router = express.Router()

// Destrocturo los metodos del controlador para usarlos en las rutas
const {
    getComments,
    createComment,
    updateComment,
    deleteComment
} = require("../controllers/commentController")


// Importo el middleware de validación de esquemas y el esquema de usuario para validar los datos de entrada
const { schemaValidator } = require('../middlewares/validateSchema')
const { commentSchema } = require("../validations/commentSchema")

// Defino las rutas y les asigno el metodo correspondiente del controlador con validaciones donde corresponda
router.get("/", getComments)
router.post("/", schemaValidator(commentSchema), createComment)
router.put("/:id", schemaValidator(commentSchema), updateComment)
router.delete("/:id", deleteComment)

// Exporto el router para usarlo en main.js
module.exports = router