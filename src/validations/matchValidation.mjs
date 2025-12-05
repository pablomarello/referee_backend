import { body } from 'express-validator';
import mongoose from "mongoose";

const matchValidations = [
  body('home_team')
    .trim().not().isEmpty().withMessage('El nombre del equipo local es requerido')
    .isLength({ min: 3 }).withMessage('El nombre del equipo local debe tener como mínimo 3 caracteres')
    .isLength({ max: 50 }).withMessage('El nombre del equipo local debe tener como máximo 50 caracteres'),
  body('away_team')
    .trim().not().isEmpty().withMessage('El nombre del equipo visitante es requerido')
    .isLength({ min: 3 }).withMessage('El nombre del equipo visitante debe tener como mínimo 3 caracteres')
    .isLength({ max: 50 }).withMessage('El nombre del equipo visitante debe tener como máximo 50 caracteres'),
  body('location')
    .trim().not().isEmpty().withMessage('La ubicación es requerida')
    .isLength({ min: 3 }).withMessage('La ubicación debe tener como mínimo 3 caracteres')
    .isLength({ max: 60 }).withMessage('La ubicación debe tener como máximo 60 caracteres'),
  body('category')
    .isIn(['primera', 'femenino', '3era', '5ta', '6ta', 'infantiles_A', 'infantiles_B'])
    .withMessage('La categoria No es válida. Debe ser "primera" , "femenino" , "3era" , "5ta" , "6ta" , "infantiles_A" o "infantiles_B".'),

  // Evitar que local y visitante sean iguales
  body().custom(({ home_team, away_team }) => {
    if (home_team && away_team && home_team === away_team) {
      throw new Error('El equipo local y el visitante no pueden ser el mismo');
    }
    return true;
  }),
  body('tournament')
    .not().isEmpty().withMessage('El torneo es requerido')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('El ID del torneo no es válido'),
  body('referee')
    .not().isEmpty().withMessage('El árbitro es requerido')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('El ID del árbitro no es válido'),
  body('assistant1')
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('El ID del asistente 1 no es válido'),
  body('assistant2')
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('El ID del asistente 2 no es válido'),
  body('score_home')
    .optional()
    .isInt({ min: 0 }).withMessage('El marcador local no puede ser negativo'),
  body('score_away')
    .optional()
    .isInt({ min: 0 }).withMessage('El marcador visitante no puede ser negativo'),

  // Evitar que el árbitro sea uno de los asistentes
  body().custom(({ referee, assistant1, assistant2 }) => {
    if (assistant1 && referee === assistant1) {
      throw new Error('El árbitro no puede ser el asistente 1');
    }
    if (assistant2 && referee === assistant2) {
      throw new Error('El árbitro no puede ser el asistente 2');
    }
    return true;
  }),

  // Evitar que los asistentes sean iguales
  body().custom(({ assistant1, assistant2 }) => {
    if (assistant1 && assistant2 && assistant1 === assistant2) {
      throw new Error('Los dos asistentes no pueden ser la misma persona');
    }
    return true;
  }),

  // Si el partido está "completed", debe haber resultado
  body().custom(({ status, score_home, score_away }) => {
    if (status === 'completed') {
      if (
        score_home === undefined ||
        score_away === undefined ||
        isNaN(score_home) ||
        isNaN(score_away)
      ) {
        throw new Error('Para completar un partido debes cargar los goles.');
      }
    }
    return true;
  })
  
]


export default matchValidations;
