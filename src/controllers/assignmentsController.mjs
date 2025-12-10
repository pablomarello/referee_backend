import { validationResult } from "express-validator";
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from "../services/assignmentsService.mjs";




export async function getAllAssignmentsController(req, res) {
  try {
        const assignments = await getAllAssignments();
        res.status(200).send(assignments);
      } catch (error) {
        res.status(500).send({ error: 'Error al obtener las asignaciones' });
      }
}

export async function createAssignmentController(req, res) {
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

  const newAssignment = req.body;
  const assignmentCreated = await createAssignment(newAssignment);
  
  if (assignmentCreated.error) {
      res.status(400).send({ mensaje: 'Error al crear la designación', error: assignmentCreated.error });
    } else {
        res.status(201).send({mensaje: 'Designación creado con éxito'});
    }
}

export async function getAssignmentByIdController(req, res) {
  const { id } = req.params;
  const assignment = await getAssignmentById(id);
  if(assignment){
    res.send(assignment);
  } else{
    res.status(404).send({ mensaje: "Designación no encontrada" });
  }
}

export async function editAssignmentController(req, res){
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

  const { id } = req.params;
    const assignment = req.body;
    const result = await updateAssignment(id, assignment);

  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo actualizar la designación', error: result.error });
    return;
  }
  res.status(200).json({
    data: result,
    mensaje: 'Designación actualizada exitosamente'
  });
}

export async function deleteAssignmentController(req, res){
  const {id} = req.params;
    const result = await deleteAssignment(id);
    if(result?.error){
      res.status(400).json({mensaje: 'No se pudo eliminar la designación', error: result.error });
      return;
    }
    res.status(200).json({
      data: result,
      mensaje: 'Designación eliminada exitosamente'
    });
}