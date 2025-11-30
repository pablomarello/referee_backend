import TournamentsRepository from "../repositories/TournamentsRepository.mjs";



export async function getAllTournaments(){
  return await TournamentsRepository.getAll();
}

export async function createTournament(tournament){
  try {
        const Tournament = await TournamentsRepository.create(tournament);
        return Tournament;
      } catch (error) {
        return {
          error: JSON.stringify(error),
        };
      }
}

export async function getTournamentById(id){
  return await TournamentsRepository.getId(id);
}

export async function updateTournament(id, tournament){
  try {
      let Tournament = await TournamentsRepository.update(id, tournament);
      const result = {...Tournament.toJSON(), ...tournament}
      return result
    } catch (error) {
  return { error };
}
}