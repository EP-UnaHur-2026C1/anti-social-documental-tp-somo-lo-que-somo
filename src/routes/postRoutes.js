// Importo express y creo un router para definir las rutas de post
const express = require("express")
const router = express.Router()

// Destrocturo los metodos del controlador para usarlos en las rutas
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/postController")

// Importo el middleware de validación de esquemas y el esquema de usuario para validar los datos de entrada
const { schemaValidator } = require('../middlewares/validateSchema')
const postSchema = require("../validators/postSchema")

// Defino las rutas y les asigno el metodo correspondiente del controlador con validaciones donde corresponda
router.get("/", getPosts)
router.get("/:id", getPostById);
router.post("/", schemaValidator(postSchema), createPost)
router.put("/:id", schemaValidator(postSchema), updatePost)
router.delete("/:id", deletePost)

// Exporto el router para usarlo en main.js
module.exports = router