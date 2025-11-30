import { createAssignment, getAllAssignments } from "../services/assignmentsService.mjs";




export async function getAllAssignmentsController(req, res) {
  try {
        const assignments = await getAllAssignments();
        res.status(200).send(assignments);
      } catch (error) {
        res.status(500).send({ error: 'Error al obtener las asignaciones' });
      }
}

export async function createAssignmentController(req, res) {
  const newAssignment = req.body;
  const assignmentCreated = await createAssignment(newAssignment);
  
  if (assignmentCreated.error) {
      res.status(400).send({ mensaje: 'Error al crear la designación', error: assignmentCreated.error });
    } else {
        res.status(201).send({mensaje: 'Designación creado con éxito'});
    }
}