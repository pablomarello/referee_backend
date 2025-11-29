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