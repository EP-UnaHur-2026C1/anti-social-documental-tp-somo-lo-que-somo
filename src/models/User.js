// importo mongoose para definir el esquema del usuario
const mongoose = require("mongoose");

// Defino el esquema del usuario
const userSchema = new mongoose.Schema(
    {
        nickname: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        // Requerimiento bonus para seguidores y seguidos
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: false
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;