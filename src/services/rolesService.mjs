import RoleRepository from "../repositories/RoleRepository.mjs";

export async function createRole(role){
   try {
      const Role = await RoleRepository.create(role);
      return Role;
    } catch (error) {
      return {
        error: JSON.stringify(error),
      };
    }
}

export async function getAllRoles(){
   return await RoleRepository.getAll();
}