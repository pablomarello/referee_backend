import { createPermission, getAllPermissions } from "../services/permissionsService.mjs";


export async function getAllPermissionsController(req, res) {
  try {
    const permissions = await getAllPermissions();
    res.status(200).send(permissions);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los permisos' });
  }
}

export async function createPermissionController(req, res) {
    const newPermission = req.body;
    const permissionCreated = await createPermission(newPermission);
  
    if (permissionCreated.error) {
      res.status(400).send({ mensaje: 'Error al crear el permiso', error: permissionCreated.error });
    } else {
        res.status(201).send({mensaje: 'Permiso creado con éxito'});
    }
}