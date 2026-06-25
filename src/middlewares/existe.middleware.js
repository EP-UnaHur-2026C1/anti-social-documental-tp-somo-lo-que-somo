const mongoose = require('mongoose');

// Antes se validaba como número. Ahora hay que validar formato de ObjectId.
const validaPathParameterMiddleware = (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID no enviado" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "El parámetro debe ser un ObjectId válido" });
    }
    next();
};

const validaExisteMiddleware = (Model) => {
    return async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "ID no enviado" });
            }
            const record = await Model.findById(id); // antes: findByPk(id)
            if (!record) {
                return res.status(404).json({
                    message: `El id ${id} no existe en el modelo ${Model.modelName}` // Model.name -> Model.modelName en Mongoose
                });
            }
            req.record = record;
            next();
        } catch (error) {
            res.status(500).json({
                message: "Error en validación de existencia",
                error: error.message
            });
        }
    };
};

module.exports = { validaPathParameterMiddleware, validaExisteMiddleware };