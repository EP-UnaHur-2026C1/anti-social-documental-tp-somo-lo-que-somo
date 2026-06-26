const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Tag = require("../models/Tag");

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
        author,
        tags,
        images
    } = req.body;

    try {
        // primero valido que el  autor exista
        //busco el id del author en la entidad User
        const userExists = await User.findById(author);

        if (!userExists) {
            return res.status(400).json({
                message: "El author no existe"
            });
        }

        // si es un post con tags valido que los tags existan
        // busco el id del tag o los tags en la entidad Tag
        if (tags && tags.length > 0) {
            const foundTags = await Tag.find({
                _id: { $in: tags }
            });

            if (foundTags.length !== tags.length) {
                return res.status(400).json({
                    message: "Uno o más tags no existen"
                });
            }
        }

        // creo post en bd
        const newPost = await Post.create({
            description,
            author,
            tags: tags || [],
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

    // busco que el id de la imagen exista dentro de mi coleccion de imagenes del post
    const imageExists = post.images.id(imageId);

    if (!imageExists) {
        return res.status(404).json({
            message: "Imagen no encontrada"
        });
    }

    //si existe la imagen dentro del post la elimino
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
    //verifico que exista el post que quiero actualizar
    if (!post) {
        return res.status(404).json({
            message: "Post no encontrado"
        });
    }
    //verifico que exista la imagen del post quiero actualizar
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