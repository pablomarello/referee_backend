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

}

export default new AssignmentRepository();