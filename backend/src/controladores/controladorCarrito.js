const Carrito = require('../modelos/carrito');
const Producto = require('../modelos/producto');
const pool = require('../configuracion/baseDatosPostgreSQL'); // Importa directamente el pool

// Crear carrito
exports.crearCarrito = async (req, res) => {
    const { usuario_id, productos } = req.body;

    try {
        // Verificar si el usuario existe en PostgreSQL
        const usuarioResult = await pool.query('SELECT * FROM usuarios WHERE id = $1', [usuario_id]);
        if (usuarioResult.rowCount === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado en PostgreSQL' });
        }

        // Validar que los productos existan en MongoDB
        const productosIds = productos.map(p => p.producto);
        const productosValidos = await Producto.find({ _id: { $in: productosIds } });
        if (productosValidos.length !== productosIds.length) {
            return res.status(400).json({ mensaje: 'Uno o más productos no son válidos' });
        }

        // Verificar si ya existe un carrito para el usuario
        const carritoExistente = await Carrito.findOne({ usuario_id });
        if (carritoExistente) {
            return res.status(400).json({ mensaje: 'Ya existe un carrito para este usuario' });
        }

        // Crear el carrito en MongoDB
        const nuevoCarrito = new Carrito({
            usuario_id,
            productos,
        });
        await nuevoCarrito.save();

        res.status(201).json({ mensaje: 'Carrito creado', carrito: nuevoCarrito });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el carrito', error: error.message });
    }
};

// Obtener carrito
exports.obtenerCarrito = async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const carrito = await Carrito.findOne({ usuario_id }).populate('productos.producto');
        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado' });
        }

        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el carrito', error: error.message });
    }
};

// Actualizar carrito
exports.actualizarCarrito = async (req, res) => {
    const { usuario_id, productos } = req.body;

    try {
        const carrito = await Carrito.findOneAndUpdate(
            { usuario_id },
            { productos },
            { new: true }
        );
        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado' });
        }

        res.status(200).json({ mensaje: 'Carrito actualizado', carrito });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el carrito', error: error.message });
    }
};

// Eliminar carrito
exports.eliminarCarrito = async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const carrito = await Carrito.findOneAndDelete({ usuario_id });
        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado' });
        }

        res.status(200).json({ mensaje: 'Carrito eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el carrito', error: error.message });
    }
};