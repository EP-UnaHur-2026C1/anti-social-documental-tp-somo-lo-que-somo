# Feedback del Trabajo Práctico (TP2 — MongoDB)

## Integrantes

A partir de los commits del repositorio:

- **Juan Manuel Solís Díaz**
- **Caro** (`carogn`)

> Trabajo repartido entre los integrantes. 👏

---

## Resumen General

¡Buen trabajo! 🎉 La entrega cumple el MVP con un modelado documental **híbrido y coherente** (imágenes embebidas en el post, comentarios y tags referenciados), validación con **Joi**, integridad referencial, y —mejora respecto del TP anterior— la **regla de los comentarios antiguos aplicada y ahora configurable por variable de entorno**. La documentación incluye Swagger y colección de Postman.

El punto a ordenar es aprovechar los middlewares que ya tienen (validación de `ObjectId`/existencia) en las rutas, para no repetir comprobaciones en los controladores.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas claras (controllers / models / middlewares / routes). |
| Modelado        |   ✅   | Híbrido coherente; `nickname` y `email` únicos. |
| Validaciones    |   ✅   | Joi + verificación de existencia de referencias al crear. |
| Middlewares     |   ⚠️   | Existen genéricos, pero no se usan en las rutas de post (Obs. 1). |
| API REST        |   ⚠️   | CRUD + imágenes; falta asociar tags a un post existente (Obs. 2). |
| Configuración   |   ✅   | `COMMENT_VISIBLE_MONTHS` configurable (documentar en `.env.example`). |
| Documentación   |   ✅   | Swagger + colección de Postman + Docker. |

---

## Fortalezas

### 1. Regla de comentarios antiguos aplicada y configurable ⏳
**Ubicación:** `src/controllers/postController.js` (`getPosts`, `getPostById`)

Al traer los posts, los comentarios se filtran por antigüedad con el umbral del entorno:

```js
const mesesVisibles = Number(process.env.COMMENT_VISIBLE_MONTHS) || 6;
// ...
const comments = await Comment.find({ post: post._id, commentDate: { $gte: fechaLimite } }).populate("author");
```

Se aplica en la visualización del post y el valor sale de una variable de entorno (¡mejora respecto del TP1, donde estaba fijo en el código!). 🎯

### 2. Modelado híbrido coherente 🗃️
**Ubicación:** `src/models/Post.js`, `src/models/Comment.js`

Las imágenes van **embebidas** en el post (subesquema con `_id`, lo que permite `post.images.id(...)`, `push`, `pull`), y los comentarios, tags y autor son **referencias**. `nickname` y `email` son únicos. Buen criterio para decidir qué embeber y qué referenciar.

### 3. Integridad referencial en la creación 🔗
**Ubicación:** `src/controllers/postController.js` (`createPost`), `src/controllers/commentController.js`

Antes de crear un post verifican que el autor y los tags existan; antes de crear un comentario, que el post y el usuario existan. Evita documentos “huérfanos”.

### 4. Validación con Joi y documentación 🛡️📚
**Ubicación:** `src/validations/`, `src/middlewares/validateSchema.js`, `swagger.yaml`, `postmanPruebas/`

Validan los cuerpos con Joi (lo recomendado) y entregan Swagger + colección de Postman.

---

## Observaciones

### 1. Los middlewares de `ObjectId`/existencia existen pero no se usan en las rutas de post

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/middlewares/existe.middleware.js`, `src/routes/postRoutes.js`, `src/controllers/postController.js`

**Descripción:**
Tienen `validaPathParameterMiddleware` (valida `ObjectId` con `isValid`) y `validaExisteMiddleware(Model)` (verifica existencia y deja el doc en `req.record`), pero **las rutas de post no los aplican**: `GET /:id`, `PUT /:id`, etc. van directo al controlador, y los controladores repiten el `findById` + 404. Además, como `getPostById` no valida el formato del id ni tiene `try/catch`, un id mal formado produce un **500** (CastError) en lugar de un 400.

**Impacto:**
Se duplican comprobaciones que ya podrían resolver los middlewares (en contra de la única responsabilidad que pide el enunciado), y la respuesta ante ids inválidos no es la adecuada.

**Recomendación:**
Aplicar `validaPathParameterMiddleware` y `validaExisteMiddleware(Post)` en las rutas con `:id`, y usar `req.record` en el controlador en lugar de volver a buscar.

---

### 2. No hay endpoint para asociar/quitar tags a un post existente

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** `src/routes/postRoutes.js` (rutas de tags comentadas)

**Descripción:**
Las rutas para asociar y quitar tags a un post están **comentadas** (`/:postId/tags/:tagId`). Hoy los tags solo se pueden definir **al crear** el post (vía el array `tags`), pero no modificarlos después.

**Impacto:**
La gestión de la relación Post↔Tag queda incompleta respecto del enunciado, que pide rutas para administrar relaciones.

**Recomendación:**
Habilitar (descomentar e implementar) los endpoints para agregar/quitar tags de un post existente.

---

### 3. Documentar `COMMENT_VISIBLE_MONTHS`

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** raíz del proyecto

**Descripción:**
La regla lee `COMMENT_VISIBLE_MONTHS` del entorno (con default 6), pero no hay un `.env.example` que documente esa variable (ni el resto).

**Recomendación:**
Sumar un `.env.example` con `COMMENT_VISIBLE_MONTHS`, la URI de Mongo y el puerto.

---

## Conclusión

Es una entrega sólida y prolija: la regla de negocio ahora **configurable**, modelado híbrido bien decidido, integridad referencial y validación con Joi. Se nota la evolución respecto del TP anterior. 🌟

Lo principal es enganchar los middlewares que ya tienen en las rutas (para aligerar los controladores y manejar bien los ids) y completar la gestión de tags. Son ajustes acotados. ¡Felicitaciones por el trabajo! 🚀
