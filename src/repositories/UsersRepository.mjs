import User from '../models/User.mjs';
import IRepository from './IRepository.mjs';

class UsersRepository extends IRepository {

  async create(user) {
    const newUser = new User(user);
    return await newUser.save();
  }

  async update(id, user) {
    return await User.findByIdAndUpdate(id, user);
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }

 async getAll() {
  return await User.find({})
    .populate("role", "name");
}

  async getId(id) {
  return await User.findById(id);
}
}

  

export default new UsersRepository();
