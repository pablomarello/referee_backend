import IRepository from "./IRepository.mjs";
import Assignment from "../models/Assignment.mjs"


class AssignmentRepository extends IRepository {

  async create(assignment) {
    const newAssignment = new Assignment(assignment);
            return await newAssignment.save();
  }

  async getAll() {
  return await Assignment.find({})
    .populate('match_id')
    .populate('referee_id', 'username')
    .populate('assistant1_id', 'username')
    .populate('assistant2_id', 'username');
}




  async getId(id) {
  return await Assignment.findById(id)
    .populate('match_id')
    .populate('referee_id', 'username email')
    .populate('assistant1_id', 'username email')
    .populate('assistant2_id', 'username email');
}


  async update(id, assignment) {
    return await Assignment.findByIdAndUpdate(id, assignment);
  }

  async delete(id){
    return await Assignment.findByIdAndDelete(id);
  }
}

export default new AssignmentRepository();