const Orden = require('../modelos/orden');
const Carrito = require('../modelos/carrito');
const pool = require('../configuracion/baseDatosPostgreSQL');

exports.crearOrdenCarrito = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        // Verificar que el usuarioId sea válido
        if (isNaN(usuarioId)) {
            return res.status(400).json({ mensaje: 'El usuarioId debe ser un número válido' });
        }


        const usuarioResult = await pool.query('SELECT * FROM usuarios WHERE id = $1', [usuarioId]);
        if (usuarioResult.rowCount === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado en PostgreSQL' });
        }
const carrito = await Carrito.findOne({ usuario_id: parseInt(usuarioId) }).populate('productos.producto');
        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado para el usuario especificado' });
        }


        let total = 0;
        const productosOrden = carrito.productos.map(item => {
            const precio = item.producto.precio * item.cantidad;
            total += precio;
            return {
                producto: item.producto._id,
                cantidad: item.cantidad,
                precio
            };
        });


        const nuevaOrden = new Orden({
            usuario: parseInt(usuarioId),
            carritoId: carrito._id,
            productos: productosOrden,
            total
        });


        await nuevaOrden.save();


        await Carrito.findOneAndUpdate({ usuario_id: parseInt(usuarioId) }, { productos: [] });


        res.status(201).json({ mensaje: 'Orden creada con éxito', orden: nuevaOrden });
    } catch (error) {

        res.status(500).json({ mensaje: 'Error al crear la orden', error: error.message });
    }
};

exports.obtenerOrdenes = async (req, res) => {
    const { ordenId } = req.params;

    try {

        const orden = await Orden.findById(ordenId).populate('productos.producto');
        if (!orden) {
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        }


        res.status(200).json({ mensaje: 'Orden encontrada', orden });
    } catch (error) {

        res.status(500).json({ mensaje: 'Error al obtener la orden', error: error.message });
    }
};
