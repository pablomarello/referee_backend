import Permission from '../models/Permission.mjs';
import IRepository from './IRepository.mjs';

class PermissionRepository extends IRepository {
   async create(permission) {
      const newPermission = new Permission(permission);
      return await newPermission.save();
    }

  async getAll() {
      return await Permission.find({});
    }
}

export default new PermissionRepository();
