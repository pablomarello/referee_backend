//Middleware para verificar el token de autenticacion
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  //Obtenemos el header de autorizacion
  const authHeader = req.headers.authorization;
  //Extraemos el token del header (El formato es "Bearer token")
  const token = authHeader && authHeader.split(' ')[1];

  //Si no hay token, retornamos un error 401
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    //Verificamos el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Guardamos la informacion del usuario decodificada en la solicitud
    req.user = decoded;
    //Continuamos al siguiente middleware o ruta
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
}