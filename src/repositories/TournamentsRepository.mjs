import Tournament from '../models/Tournament.mjs';
import IRepository from './IRepository.mjs';


class TournamentsRepository extends IRepository {
  async getAll() {
      return await Tournament.find({});
    }

  async create(tournament) {
    const newTournament = new Tournament(tournament);
      return await newTournament.save();
  }
}

export default new TournamentsRepository();