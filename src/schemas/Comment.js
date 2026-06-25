// importo mongoose para definir el esquema de los comentarios.
const mongoose = require("mongoose");
// Defino el esquema del comentario
const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        // Requerimiento bonus para autor y post
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Atributo de fecha para saber fecha exacta del comentario
        commentDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: false
    }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;