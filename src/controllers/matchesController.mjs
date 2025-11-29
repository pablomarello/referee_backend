import { createMatch, getAllMatches } from "../services/matchesService.mjs";




export async function getAllMatchesController(req, res) {
  try {
      const matches = await getAllMatches();
      res.status(200).send(matches);
    } catch (error) {
      res.status(500).send({ error: 'Error al obtener los partidos' });
    }
}

export async function createMatchController(req, res) {
  const newMatch = req.body;
  const matchCreated = await createMatch(newMatch);
  
    if (matchCreated.error) {
      res.status(400).send({ mensaje: 'Error al crear el partido', error: matchCreated.error });
    } else {
        res.status(201).send({mensaje: 'Partido creado con éxito'});
    }
}