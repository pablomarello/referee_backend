import IRepository from "./IRepository.mjs";
import Assignment from "../models/Assignment.mjs"


class AssignmentRepository extends IRepository {

  async create(assignment) {
    const newAssignment = new Assignment(assignment);
            return await newAssignment.save();
  }

  async getAll() {
        return await Assignment.find({});
      }

  async getId(id){
    return await Assignment.findById(id);
  }

  async update(id, assignment) {
    return await Assignment.findByIdAndUpdate(id, assignment);
  }

  async delete(id){
    return await Assignment.findByIdAndDelete(id);
  }
}

export default new AssignmentRepository();