const User = require("../schemas/User");

const getAllUsers = async (req, res) => {
    try {

        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: "Error al obtener usuarios",
            error: error.message
        });

    }
};

const getUserById = async (req, res) => {

    try {

        const user = req.record;

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: "Error al obtener usuario",
            error: error.message
        });

    }

};

const createUser = async (req, res) => {

    try {
        const { nickname, email } = req.body;
        //validacion de nickname 
        const existingNickname = await User.findOne({
            nickname
        });

        if (existingNickname) {
            return res.status(400).json({
                message: "El nickname ya existe"
            });
        }
        //validacion de email
        const existingEmail = await User.findOne({
            email
        });

        if (existingEmail) {
            return res.status(400).json({
                message: "El email ya está registrado"
            });
        }
        // creo nuevo usuario
        const newUser = await User.create({
            nickname,
            email
        });

        res.status(201).json({
            message: "Usuario creado correctamente",
            user: newUser
        });

    } catch (error) {

        res.status(500).json({
            message: "Error al crear usuario",
            error: error.message
        });

    }

};

const updateUser = async (req, res) => {

    try {

        const { nickname, email } = req.body;

        const user = req.record;

        user.nickname = nickname;
        user.email = email;

        await user.save();

        res.status(200).json({
            message: "Usuario actualizado correctamente",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Error al actualizar usuario",
            error: error.message
        });

    }

};

const deleteUser = async (req, res) => {

    try {

        const user = req.record;

        await User.findByIdAndDelete(user._id);

        res.status(200).json({
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error al eliminar usuario",
            error: error.message
        });

    }

};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};