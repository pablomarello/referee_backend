import { validationResult } from "express-validator";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../services/usersService.mjs";

export async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los usuarios' });
  }
}

export async function createUserController(req, res) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

  const newUser = req.body;
  const userCreated = await createUser(newUser);

  if (userCreated.error) {
    res.status(400).send({ mensaje: 'Error al crear el usuario', error: userCreated.error });
  } else {
      res.status(201).send({mensaje: 'Usuario creado con éxito'});
  }
}

export async function getUserByIdController(req, res) {
  const { id } = req.params;
  const user = await getUserById(id);

  if(user){
    res.send(user);
  } else{
    res.status(404).send({ mensaje: "Usuario no encontrado" });
  }
}

export async function editUserController(req, res) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
  
  const { id } = req.params;
  const user = req.body;
  const result = await updateUser(id, user);

  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo actualizar el usuario', error: result.error });
    return;
  }
  res.status(200).json({
    data: result,
    mensaje: 'Usuario actualizado exitosamente'
  });
}

export async function deleteUserController(req, res) {
  const {id} = req.params;
  const result = await deleteUser(id);
  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo eliminar el usuario', error: result.error });
    return;
  }
  res.status(200).json({
    data: result,
    mensaje: 'Usuario eliminado exitosamente'
  });
}
