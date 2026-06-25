// Importo express y creo un router para definir las rutas de usuario
const express = require("express");
const router = express.Router();

// Destrocturo los metodos del controlador para usarlos en las rutas
const {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
} = require("../controllers/userController");


// Importo el middleware de validación de esquemas y el esquema de usuario para validar los datos de entrada
const { schemaValidator } = require("../middlewares/validateSchema");
const { validaPathParameterMiddleware, validaExisteMiddleware } = require("../middlewares/existe.middleware");
const { User } = require("../db/models");
const { userSchema } = require("../validators/userSchema");

// Defino las rutas y les asigno el metodo correspondiente del controlador con validaciones donde corresponda
router.get("/", getAllUsers);
router.get("/:id", validaPathParameterMiddleware, validaExisteMiddleware(User), getUserById);
router.post("/", schemaValidator(userSchema), createUser);
router.put("/:id", validaPathParameterMiddleware, validaExisteMiddleware(User), schemaValidator(userSchema), updateUser);
router.delete("/:id", validaPathParameterMiddleware, validaExisteMiddleware(User), deleteUser);

// Exporto el router para usarlo en main.js
module.exports = router;