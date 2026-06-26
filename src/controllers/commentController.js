//Importo los esquemas correspondientes para poder aplicar mis funciones crud
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

// Obtener todos los comentarios
const getComments = async (req, res) => {

    try {

        const comments = await Comment.find()
            .populate("post")
            .populate("author");

        res.json(comments);

    } catch (error) {

        res.status(500).json({
            message: "Error al obtener comentarios",
            error: error.message
        });

    }

};

// Crear comentario
const createComment = async (req, res) => {
    try {
        const { text, post, author } = req.body;
        //verifico que exista el post
        const postExists = await Post.findById(post);
        if (!postExists) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }
        //verifico que exista el user
        const userExists = await User.findById(author);
        if (!userExists) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        //creo comentario
        const newComment = await Comment.create({
            text,
            post,
            author,
            commentDate: new Date()
        });

        res.status(201).json(newComment);

    } catch (error) {
        res.status(500).json({
            message: "Error al crear comentario",
            error: error.message
        });
    }
};

// Actualizar comentario
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const comment = await Comment.findById(id);
        // valido que el comentario exista 
        if (!comment) {
            return res.status(404).json({
                message: "Comentario no encontrado"
            });

        }
        //si el comentario existe entonces guardo la modificacion
        comment.text = text;
        await comment.save();
        res.json(comment);

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar comentario",
            error: error.message
        });
    }
};

// Eliminar comentario
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                message: "Comentario no encontrado"
            });
        }

        await Comment.findByIdAndDelete(id);
        res.json({
            message: "Comentario eliminado"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error al eliminar comentario",
            error: error.message
        });
    }
};

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment
};