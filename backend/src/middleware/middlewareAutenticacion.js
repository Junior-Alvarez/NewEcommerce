const jwt = require('jsonwebtoken');

const middlewareAutenticacion = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
            return res.status(401).json({ mensaje: 'se requiere un token de autenticación' });
    };

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({ mensaje: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = middlewareAutenticacion