import { body } from 'express-validator';

const tournamentValidations = [
  body('name')
    .trim().not().isEmpty().withMessage('El nombre del torneo es requerido')
    .isLength({ min: 2 }).withMessage('El nombre debe tener como mínimo 2 caracteres')
    .isLength({ max: 60 }).withMessage('El nombre debe tener como máximo 60 caracteres'),
  body('year')
    .not().isEmpty().withMessage('El año del torneo es requerido')
    .isInt().withMessage('El año debe ser un número entero')
    .isLength({ min: 4, max: 4 }).withMessage('El año debe tener exactamente 4 dígitos')
]


export default tournamentValidations;