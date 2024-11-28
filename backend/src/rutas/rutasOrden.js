const express = require('express');
const router = express.Router();
const controladorOrden = require('../controladores/controladorOrden');


router.post('/:usuarioId/crear', controladorOrden.crearOrdenCarrito); 
router.get('/:usuarioId/orden/:ordenId', controladorOrden.obtenerOrdenes); 

module.exports = router;
