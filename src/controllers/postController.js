const Post = require("../schemas/Post");
const Comment = require("../schemas/Comment");

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

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};