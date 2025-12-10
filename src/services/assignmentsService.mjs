import assignmentsRepository from '../repositories/AssignmentsRepository.mjs'


export async function getAllAssignments(){
  return await assignmentsRepository.getAll();

}

export async function createAssignment(assignment){
  try {
        const Assignment = await assignmentsRepository.create(assignment);
        return Assignment;
      } catch (error) {
        return {
          error: JSON.stringify(error),
        };
      }
}

export async function getAssignmentById(id){
  return await assignmentsRepository.getId(id);
}

export async function updateAssignment(id, assignment){
  try {
      let Assignment = await assignmentsRepository.update(id, assignment);
      const result = {...Assignment.toJSON(), ...assignment}
      return result
    } catch (error){
      return {
        error: JSON.stringify(error)
      }
    }
}

export async function deleteAssignment(id){
  try {
      return await assignmentsRepository.delete(id);
    } catch (error) {
      return {
        error: JSON.stringify(error)
      }
    }
}