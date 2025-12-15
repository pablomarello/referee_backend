import { validationResult } from "express-validator";
import { createMatch, deleteMatch, getAllMatches, getMatchById, updateMatch } from "../services/matchesService.mjs";




export async function getAllMatchesController(req, res) {
  try {
      const matches = await getAllMatches();
      res.status(200).send(matches);
    } catch (error) {
      res.status(500).send({ error: 'Error al obtener los partidos' });
    }
}

export async function createMatchController(req, res) {
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }
  const newMatch = req.body;
  const matchCreated = await createMatch(newMatch);
  
    if (matchCreated.error) {
      res.status(400).send({ mensaje: 'Error al crear el partido', error: matchCreated.error });
    } else {
        res.status(201).send({mensaje: 'Partido creado con éxito'});
    }
}

export async function getMatchByIdController(req, res) {
  const { id } = req.params;
  const match = await getMatchById(id);

  if(match){
    res.send(match);
  } else{
    res.status(404).send({ mensaje: "Partido no encontrado" });
  }
}

export async function editMatchController(req, res) {
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }
    

    const { id } = req.params;
    const match = req.body;
    const result = await updateMatch(id, match);
    if(result?.error){
      res.status(400).json({mensaje: 'No se pudo actualizar el partido', error: result.error });
      return;
    }
    res.status(200).json({
      data: result,
      mensaje: 'Partido actualizado exitosamente'
    });
}

export async function deleteMatchController(req, res) {
  const { id } = req.params;
  const result = await deleteMatch(id);
  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo eliminar el partido', error: result.error });
    return;
  }
  res.status(200).json({
    data: result,
    mensaje: 'Partido eliminado exitosamente'
  });
}