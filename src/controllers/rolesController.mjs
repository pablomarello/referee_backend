import { createRole, getAllRoles } from "../services/rolesService.mjs";


export async function getAllRolesController(req, res) {
  try {
    const roles = await getAllRoles();
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los roles' });
  }
}

export async function createRoleController(req, res) {
  const newRole = req.body;
  const roleCreated = await createRole(newRole);

  if (roleCreated.error) {
    res.status(400).send({ mensaje: 'Error al crear el rol', error: roleCreated.error });
  } else {
      res.status(201).send({mensaje: 'Rol creado con éxito'});
  }
}