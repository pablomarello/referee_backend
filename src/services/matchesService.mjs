import matchesRepository from '../repositories/MatchesRepository.mjs'

export async function getAllMatches(){
  return await matchesRepository.getAll();
}

export async function createMatch(match){
  try {
      const Match = await matchesRepository.create(match);
      return Match;
    } catch (error) {
      return {
        error: JSON.stringify(error),
      };
    }
}