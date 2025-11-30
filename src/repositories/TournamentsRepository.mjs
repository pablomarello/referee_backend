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

  async getId(id) {
    return await Tournament.findById(id);
  }

  async update(id, tournament){
    return await Tournament.findByIdAndUpdate(id, tournament);
  }
}

export default new TournamentsRepository();