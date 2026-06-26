// Importo express y creo un router para definir las rutas de comentarios
const express = require("express");
const router = express.Router();

// Desestructuro los métodos del controlador para usarlos en las rutas
const {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} = require("../controllers/commentController");

// Importo el middleware de validación de esquemas y el esquema de comentario
const { schemaValidator } = require("../middlewares/validateSchema");
const { commentSchema } = require("../validations/commentSchema");

// Defino las rutas y les asigno el método correspondiente del controlador
router.get("/", getComments);
router.get("/:id", getCommentById);
router.post("/", schemaValidator(commentSchema), createComment);
router.put("/:id", schemaValidator(commentSchema), updateComment);
router.delete("/:id", deleteComment);

// Exporto el router para usarlo en main.js
module.exports = router;