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