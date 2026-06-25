// Middleware para validar que el body de la request cumpla con el schema definido
const schemaValidator = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body, { abortEarly: false })
        if (result.error) {
            return res.status(400).json({
                errores: result.error.details.map(e => {
                    return { atributo: e.path[0], error: e.message }
                })
            })
        }
        next()
    }
}
// Exporto el middleware para usarlo en las rutas
module.exports = { schemaValidator };