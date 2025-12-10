import { body } from 'express-validator';
import mongoose from "mongoose";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);


const assignmentValidations = [
  // match_id obligatorio y válido
  body("match_id")
    .notEmpty().withMessage("El campo match_id es obligatorio")
    .custom((value) => {
      if (!isValidObjectId(value)) throw new Error("match_id no es un ObjectId válido");
      return true;
    }),
  // referee_id obligatorio y válido
  body("referee_id")
    .notEmpty().withMessage("El campo referee_id es obligatorio")
    .custom((value) => {
      if (!isValidObjectId(value)) throw new Error("referee_id no es un ObjectId válido");
      return true;
    }),
  // assistant1_id obligatorio y válido
  body("assistant1_id")
    .notEmpty().withMessage("El campo assistant1_id es obligatorio")
    .custom((value) => {
      if (!isValidObjectId(value)) throw new Error("assistant1_id no es un ObjectId válido");
      return true;
    }),
  // assistant2_id obligatorio y válido
  body("assistant2_id")
    .notEmpty().withMessage("El campo assistant2_id es obligatorio")
    .custom((value) => {
      if (!isValidObjectId(value)) throw new Error("assistant2_id no es un ObjectId válido");
      return true;
    }),
  // Evitar que el referee sea igual a cualquiera de los asistentes
  body().custom(({ referee_id, assistant1_id, assistant2_id }) => {
    if (referee_id === assistant1_id || referee_id === assistant2_id) {
      throw new Error("El árbitro principal no puede ser el mismo que un asistente");
    }
    return true;
  }),
  // Evitar que assistant1 y assistant2 sean el mismo
  body().custom(({ assistant1_id, assistant2_id }) => {
    if (assistant1_id === assistant2_id) {
      throw new Error("assistant1 y assistant2 no pueden ser el mismo usuario");
    }
    return true;
  }),
  // Loongitud de observaciones
  body("observations")
    .optional()
    .isLength({ max: 500 })
    .withMessage("observations no puede tener más de 500 caracteres")
]

export default assignmentValidations;