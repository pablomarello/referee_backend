import { validationResult } from "express-validator";
import { createTournament, getAllTournaments, getTournamentById, updateTournament } from "../services/tournamentsService.mjs";


export async function getAllTournamentsController(req, res){
 try {
    const tournaments = await getAllTournaments();
    res.status(200).send(tournaments);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los Torneos' });
  }
}

export async function createTournamentController(req, res){
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }
      
  const newTournament = req.body;
  const tournamentCreated = await createTournament(newTournament);

  if (tournamentCreated.error) {
      res.status(400).send({ mensaje: 'Error al crear el torneo', error: tournamentCreated.error });
    } else {
        res.status(201).send({mensaje: 'Torneo creado con éxito'});
    }
}

export async function getTournamentByIdController(req, res){
  const { id } = req.params;
  const tournament = await getTournamentById(id);

  if(tournament){
    res.send(tournament);
  } else{
    res.status(404).send({ mensaje: "Torneo no encontrado" });
  }
}

export async function editTournamentController(req, res){
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

  const { id } = req.params;
  const tournament = req.body;
  const result = await updateTournament(id, tournament);

  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo actualizar el Torneo', error: result.error });
    return;
  }
  res.status(200).json({
    data: result,
    mensaje: 'Torneo actualizado exitosamente'
  });
}