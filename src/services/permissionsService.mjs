import permissionRepository from '../repositories/PermissionRepository.mjs'


export async function getAllPermissions(){
  return await permissionRepository.getAll();
}

export async function createPermission(permission){
  try {
      const Permission = await permissionRepository.create(permission);
      return Permission;
    } catch (error) {
      return {
        error: JSON.stringify(error),
      };
    }
}