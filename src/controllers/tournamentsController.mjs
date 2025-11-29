import { createTournament, getAllTournaments } from "../services/tournamentsService.mjs";


export async function getAllTournamentsController(req, res){
 try {
    const tournaments = await getAllTournaments();
    res.status(200).send(tournaments);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los Torneos' });
  }
}

export async function createTournamentController(req, res){
  const newTournament = req.body;
  const tournamentCreated = await createTournament(newTournament);

  if (tournamentCreated.error) {
      res.status(400).send({ mensaje: 'Error al crear el torneo', error: tournamentCreated.error });
    } else {
        res.status(201).send({mensaje: 'Torneo creado con éxito'});
    }
}