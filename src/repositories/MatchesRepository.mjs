import Match from '../models/Match.mjs'
import IRepository from './IRepository.mjs';

class UsersRepository extends IRepository {

  async create(match) {
    const newMatch = new Match(match);
        return await newMatch.save();
  }

  async getAll() {
      return await Match.find({});
    }

  
}

export default new UsersRepository();
