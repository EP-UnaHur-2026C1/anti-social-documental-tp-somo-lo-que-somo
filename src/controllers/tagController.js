const Tag = require("../schemas/Tag");

const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);

    } catch (error) {

        res.status(500).json({
            message: "Error al obtener tags",
            error: error.message
        });
    }
};

const getTagById = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findById(id);
        // Verifico que exista el tag, sino tiro error
        if (!tag) {
            return res.status(404).json({
                message: "Tag no encontrado"
            });
        }

        res.json(tag);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener tag",
            error: error.message
        });
    }
};

const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const existingTag = await Tag.findOne({
            name
        });
        // si ya existe el tag lanzo mensaje de error
        if (existingTag) {
            return res.status(400).json({
                message: "Ya existe un tag con ese nombre"
            });
        }
        // si no existe lo creo
        const newTag = await Tag.create({
            name
        });
        res.status(201).json(newTag);

    } catch (error) {
        res.status(500).json({
            message: "Error al crear tag",
            error: error.message
        });
    }
};

const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const tag = await Tag.findById(id);

        if (!tag) {
            return res.status(404).json({
                message: "Tag no encontrado"
            });
        }

        tag.name = name;
        await tag.save();
        res.json(tag);

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar tag",
            error: error.message
        });
    }
};

const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findById(id);

        if (!tag) {
            return res.status(404).json({
                message: "Tag no encontrado"
            });
        }

        await Tag.findByIdAndDelete(id);
        res.json({
            message: "Tag eliminado"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar tag",
            error: error.message
        });
    }
};

module.exports = {
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
};