import User from "../models/User.mjs";

// Middleware que recibe un permiso requerido y verifica si el usuario tiene ese permiso
export const hasPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if(!req.user) {
        return res.status(401).json({ message: 'Acceso denegado. No autenticado.' });
      }      
      //Obtenemos usuario con su rol y permisos populados
      const user = await User.findById(req.user.id)
        .populate({
          path: 'role',
          populate: {
            path: 'permission'
          }
        })

        const hasPermission = user.role.permission.some(perm => perm.name === requiredPermission);

      if (!hasPermission) {
        return res.status(403).json({ message: 'Acceso denegado. No tiene permiso suficiente.' });
      }
      next();
    } catch (error) {
      console.error('Error en el middleware de autorización:', error);
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }};
}