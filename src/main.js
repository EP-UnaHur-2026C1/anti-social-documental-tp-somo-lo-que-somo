// Importo dotenv para manejar variables de entorno
require("dotenv").config();
// importo express para crear el servidor
const express = require("express");
const app = express();

// Importo la función de conexión a la base de datos
const connectToDB = require("./db/database");
// Defino el puerto en el que correrá el servidor
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Defino las rutas de la API
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const tagRoutes = require("./routes/tagRoutes");
const userRoutes = require("./routes/userRoutes");

// Uso de las rutas en la aplicación
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/tags", tagRoutes);
app.use("/users", userRoutes);


// Middleware para rutas inexistentes
app.use((req, res) => {
    res.status(404).json({
        message: "Ruta no encontrada"
    });
});

/* DEBUG
app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
});*/

// Función para iniciar el servidor
const startServer = async () => {
    try {
        await connectToDB();

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });

    } catch (error) {
        console.error("Error al iniciar servidor:", error);
    }
};

startServer();