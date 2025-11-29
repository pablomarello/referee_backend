import userRepository from '../repositories/UsersRepository.mjs'


export async function getAllUsers(){
  return await userRepository.getAll();
}

export async function createUser(user){
  try {
    const User = await userRepository.create(user);
    return User;
  } catch (error) {
    return {
      error: JSON.stringify(error),
    };
  }
}

export async function getUserById(id){
  return await userRepository.getId(id);
}

export async function updateUser(id, user){
  try {
    let User = await userRepository.update(id, user);
    const result = {...User.toJSON(), ...user}
    return result
  } catch (error){
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function deleteUser(id){
  try {
    return await userRepository.delete(id);
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}