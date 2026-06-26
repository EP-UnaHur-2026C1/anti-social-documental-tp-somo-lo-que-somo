const express = require("express");
const router = express.Router();

// Me traigo los metodos crud para la entidad user
const {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
} = require("../controllers/userController");

// Middleware para el esquema/modelo
const { schemaValidator } = require("../middlewares/validateSchema");
// Middleware para validar el id pasado por parametro
const {
    validaPathParameterMiddleware,
    validaExisteMiddleware
} = require("../middlewares/existe.middleware");

const User = require("../models/User");
// Aca uso 2 validadores de esquema joi uno para crear y otro para updatear , ya que se deberia poder modificar solo 1 o ambos atributos de User
const { userCreateSchema } = require("../validations/userCreateSchema");
const { userUpdateSchema } = require("../validations/userUpdateSchema");
// Mas debug console.log(userUpdateSchema.describe());


router.get("/", getAllUsers);

router.get(
    "/:id",
    validaPathParameterMiddleware,
    validaExisteMiddleware(User),
    getUserById
);

router.post(
    "/",
    schemaValidator(userCreateSchema),
    createUser
);


router.put(
    "/:id",
    validaPathParameterMiddleware,
    validaExisteMiddleware(User),
    schemaValidator(userUpdateSchema),
    updateUser
);

router.delete(
    "/:id",
    validaPathParameterMiddleware,
    validaExisteMiddleware(User),
    deleteUser
);

module.exports = router;