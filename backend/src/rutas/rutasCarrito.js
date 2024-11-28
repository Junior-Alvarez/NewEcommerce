const express = require('express');
const router = express.Router();
const controladorCarrito = require('../controladores/controladorCarrito'); // Importación del controlador

// Crear carrito
router.post('/crear', controladorCarrito.crearCarrito);

// Obtener carrito
router.get('/:usuario_id', controladorCarrito.obtenerCarrito);

// Actualizar carrito
router.put('/actualizar', controladorCarrito.actualizarCarrito);

// Eliminar carrito
router.delete('/vaciar/:usuario_id', controladorCarrito.eliminarCarrito);

module.exports = router;