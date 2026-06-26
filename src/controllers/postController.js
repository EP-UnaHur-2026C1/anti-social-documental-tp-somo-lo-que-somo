const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Tag = require("../models/Tag");

const mesesVisibles =
    Number(process.env.COMMENT_VISIBLE_MONTHS) || 6;

// Obtener todos los posts
const getPosts = async (req, res) => {

    try {
        //defino la fecha limite para mostrar comentarios
        const fechaLimite = new Date();
        fechaLimite.setMonth(
            fechaLimite.getMonth() - mesesVisibles
        );

        const posts = await Post.find()
            .populate("author")
            .populate("tags");

        // hago un promise all para esperar la respuesta de todos los posts
        const resultado = await Promise.all(
            posts.map(async (post) => {

                const comments = await Comment.find({
                    post: post._id,
                    visible: true,
                    commentDate: {
                        $gte: fechaLimite
                    }
                }).populate("author");

                return {
                    ...post.toObject(),
                    comments
                };
            })
        );

        res.json(resultado);

    } catch (error) {

        res.status(500).json({
            message: "Error al obtener los posts",
            error: error.message
        });

    }

};

// Obtener un post por id
const getPostById = async (req, res) => {

    try {

        const { id } = req.params;

        const fechaLimite = new Date();

        fechaLimite.setMonth(
            fechaLimite.getMonth() - mesesVisibles
        );

        const post = await Post.findById(id)
            .populate("author")
            .populate("tags");

        if (!post) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        const comments = await Comment.find({
            post: id,
            visible: true,
            commentDate: {
                $gte: fechaLimite
            }
        }).populate("author");

        res.json({
            ...post.toObject(),
            comments
        });

    } catch (error) {

        res.status(500).json({
            message: "Error al obtener el post",
            error: error.message
        });

    }

};

// Crear post
const createPost = async (req, res) => {

    try {

        const {
            description,
            tagIds,
            author,
            images
        } = req.body;

        // Validar existencia del usuario
        const user = await User.findById(author);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        // Validar existencia de tags
        if (tagIds && tagIds.length > 0) {

            const tags = await Tag.find({
                _id: {
                    $in: tagIds
                }
            });

            if (tags.length !== tagIds.length) {
                return res.status(404).json({
                    message: "Uno o más tags no existen"
                });
            }

        }

        const newPost = await Post.create({
            description,
            author,
            tags: tagIds || [],
            images: images || []
        });

        res.status(201).json(newPost);

    } catch (error) {

        res.status(500).json({
            message: "Error al crear el post",
            error: error.message
        });

    }

};

// Actualizar post
const updatePost = async (req, res) => {

    try {

        const { id } = req.params;
        const { description } = req.body;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        post.description = description;

        await post.save();

        res.json(post);

    } catch (error) {

        res.status(500).json({
            message: "Error al actualizar el post",
            error: error.message
        });

    }

};

// Eliminar post
const deletePost = async (req, res) => {

    try {

        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        await Post.findByIdAndDelete(id);

        res.json({
            message: "Post eliminado"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error al eliminar el post",
            error: error.message
        });

    }

};

// Agregar imagen al post
const addImgToPost = async (req, res) => {

    try {

        const { postId } = req.params;
        const { url } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        post.images.push({ url });

        await post.save();

        res.status(201).json(post);

    } catch (error) {

        res.status(500).json({
            message: "Error al agregar imagen",
            error: error.message
        });

    }

};

// Eliminar imagen del post
const deleteImgFromPost = async (req, res) => {

    try {

        const { postId, imageId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        post.images.pull(imageId);

        await post.save();

        res.json({
            message: "Imagen eliminada"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error al eliminar imagen",
            error: error.message
        });

    }

};

// Actualizar imagen del post
const updateImgFromPost = async (req, res) => {

    try {

        const { postId, imageId } = req.params;
        const { url } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        const image = post.images.id(imageId);

        if (!image) {
            return res.status(404).json({
                message: "Imagen no encontrada"
            });
        }

        image.url = url;

        await post.save();

        res.json(post);

    } catch (error) {

        res.status(500).json({
            message: "Error al actualizar imagen",
            error: error.message
        });

    }

};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    addImgToPost,
    deleteImgFromPost,
    updateImgFromPost
};