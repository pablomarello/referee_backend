import IRepository from "./IRepository.mjs";
import Role from "../models/Role.mjs";

class RolesRepository extends IRepository {

  async create(role) {
    const newRole = new Role(role);
    return await newRole.save();
  }

  async getAll() {
    return await Role.find({});
  }
}

  

export default new RolesRepository();