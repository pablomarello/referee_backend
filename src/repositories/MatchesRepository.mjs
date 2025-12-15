import Match from '../models/Match.mjs'
import IRepository from './IRepository.mjs';

class UsersRepository extends IRepository {

  async create(match) {
    const newMatch = new Match(match);
        return await newMatch.save();
  }

  async getAll() {
  return await Match.find({})
    .populate('tournament');
}


  async getId(id){
    return await Match.findById(id);
  }

  async update(id, match){
    return await Match.findByIdAndUpdate(id, match);
  }

  async delete(id){
    return await Match.findByIdAndDelete(id);
  }
}

export default new UsersRepository();
