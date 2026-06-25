// Importo express y creo un router para definir las rutas de postImage
const express = require("express");
const router = express.Router();

// Destrocturo los metodos del controlador para usarlos en las rutas
const {
    getAllPostImages,
    createPostImage,
    updatePostImage,
    deletePostImage,
    getPostImageById
} = require("../controllers/postImageController");

// Importo el middleware de validación de esquemas y el esquema de usuario para validar los datos de entrada
const { schemaValidator } = require("../middlewares/validateSchema");
const { validaPathParameterMiddleware, validaExisteMiddleware } = require("../middlewares/existe.middleware");

// Me traigo el modelo de Post para validar que exista el postId al crear una imagen
const { PostImage, Post } = require("../db/models");
// Importo el esquema de postImage para validar los datos de entrada
const { postImageSchema } = require("../validators/postImageSchema");

// Defino las rutas y les asigno el metodo correspondiente del controlador con validaciones donde corresponda
router.get("/", getAllPostImages);
router.get("/:id", validaPathParameterMiddleware, validaExisteMiddleware(PostImage), getPostImageById);
router.post("/", schemaValidator(postImageSchema), createPostImage);
router.put("/:id", validaPathParameterMiddleware, schemaValidator(postImageSchema), validaExisteMiddleware(PostImage), updatePostImage);
router.delete("/:id", validaPathParameterMiddleware, validaExisteMiddleware(PostImage), deletePostImage);

// Exporto el router para usarlo en main.js
module.exports = router;