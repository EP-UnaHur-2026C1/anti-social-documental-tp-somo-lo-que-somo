// Importo moongose para definir el esquema de los Tags
const mongoose = require("mongoose");
// Defino el esquema de Tag
const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    {
        timestamps: false
    }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;