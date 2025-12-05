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

export async function getMatchById(id){
  return await matchesRepository.getId(id);
}

export async function updateMatch(id, match){
  try {
      let Match = await matchesRepository.update(id, match);
      const result = {...Match.toJSON(), ...match}
      return result
    } catch (error){
      return {
        error: JSON.stringify(error)
      }
    }
}

export async function deleteMatch(id){
  try {
      return await matchesRepository.delete(id);
    } catch (error) {
      return {
        error: JSON.stringify(error)
      }
    }
}