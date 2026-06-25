const Post = require("../models/Post");
const Comment = require("../models/Comment");

const mesesVisibles =
    Number(process.env.COMMENT_VISIBLE_MONTHS) || 6;

// Obtener todos los posts
const getPosts = async (req, res) => {

    const fechaLimite = new Date();

    fechaLimite.setMonth(
        fechaLimite.getMonth() - mesesVisibles
    );

    const posts = await Post.find()
        .populate("author")
        .populate("tags");

    const resultado = await Promise.all(
        posts.map(async (post) => {

            const comments = await Comment.find({
                post: post._id,
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
};

// Obtener un post por id
const getPostById = async (req, res) => {

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
        commentDate: {
            $gte: fechaLimite
        }
    }).populate("author");

    res.json({
        ...post.toObject(),
        comments
    });
};

// Crear post
const createPost = async (req, res) => {

    const {
        description,
        tagIds,
        userId
    } = req.body;

    const newPost = await Post.create({
        description,
        author: userId,
        tags: tagIds || []
    });

    res.status(201).json(newPost);
};

// Actualizar post
const updatePost = async (req, res) => {

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
};

// Eliminar post
const deletePost = async (req, res) => {

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
};

// agregar imagen al post 
const addImgToPost = async (req, res) => {
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
};

// eliminar imagen del post 
const deleteImgFromPost = async (req, res) => {
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
};


// actualizar imagen de un post 
const updateImgFromPost = async (req, res) => {
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