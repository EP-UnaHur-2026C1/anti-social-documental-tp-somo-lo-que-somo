// importo mongoose para definir el esquema del post.
const mongoose = require("mongoose");
// Defino el esquema de la imagen
const imageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        }
    },
    {
        _id: true
    }
);
// Defino el esquema del post
const postSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true
        },

        // Requerimiento bonus para autor
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        // Requerimiento bonus para imágenes
        images: [imageSchema],
        // Requerimiento bonus para tags
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            }
        ]
    },
    {
        timestamps: true
    }
);
// Creo el modelo del post y lo exporto
const Post = mongoose.model("Post", postSchema);
module.exports = Post;