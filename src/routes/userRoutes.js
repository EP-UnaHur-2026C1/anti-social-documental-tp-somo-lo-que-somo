const express = require("express");
const router = express.Router();

const {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
} = require("../controllers/userController");

const { schemaValidator } = require("../middlewares/validateSchema");

const {
    validaPathParameterMiddleware,
    validaExisteMiddleware
} = require("../middlewares/existe.middleware");

const User = require("../models/User");
const { userSchema } = require("../validations/userSchema");

router.get("/", getAllUsers);

router.get(
    "/:id",
    validaPathParameterMiddleware,
    validaExisteMiddleware(User),
    getUserById
);

router.post(
    "/",
    schemaValidator(userSchema),
    createUser
);

router.put(
    "/:id",
    validaPathParameterMiddleware,
    validaExisteMiddleware(User),
    schemaValidator(userSchema),
    updateUser
);

router.delete(
    "/:id",
    validaPathParameterMiddleware,
    validaExisteMiddleware(User),
    deleteUser
);

module.exports = router;