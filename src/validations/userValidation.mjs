import { body } from 'express-validator';

const userValidations = [
  body('name')
    .trim().not().isEmpty().withMessage('El nombre del usuario es requerido')
    .isLength({ min: 3 }).withMessage('El nombre debe tener como mínimo 3 caracteres')
    .isLength({ max: 60 }).withMessage('El nombre debe tener como máximo 60 caracteres'),
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido.')
    .isEmail().withMessage('Debe ingresar un email válido.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es requerida.')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
    .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una letra mayúscula.')
    .matches(/[a-z]/).withMessage('La contraseña debe tener al menos una letra minúscula.')
    .matches(/[0-9]/).withMessage('La contraseña debe tener al menos un número.'),
  body('date_of_birth')
    .optional(),
  body('role')
    .isIn(['coordinador', 'arbitro'])
    .withMessage('El rol debe ser "coordinador" o "arbitro".'),
  body('type_referee')
    .optional()
    .isIn(['principal', 'asistente'])
    .withMessage('El tipo de árbitro debe ser "principal" o "asistente".')
    //Si el rol es "coordinador", no debe tener un type_referee
    .custom((value, { req }) => {
      if (req.body.role === 'coordinador' && value) {
        throw new Error('Un coordinador no puede tener tipo de árbitro.');
      }
      return true;
    })
    //Si el rol es "arbitro", debe tener type_referee
    .custom((value, { req }) => {
      if (req.body.role === 'arbitro' && !value) {
        throw new Error('Un árbitro debe especificar si es principal o asistente.');
      }
      return true;
    }),
  body('active')
    .isBoolean().withMessage('El campo active debe ser booleano.')
]

export default userValidations;