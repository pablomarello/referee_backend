import User from "../models/User.mjs";
import Role from "../models/Role.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class AuthService {
  //Metodo para registrar un nuevo usuario
  async register(UserData) {
    //Verificamos si ya existe un usuario con el mismo email o username
    const existingUser = await User.findOne({
      $or: [
        { email: UserData.email },
        { username: UserData.username }
      ]
    });

    //Si existe, lanzamos un error
    if (existingUser) {
      throw new Error("El email o nombre de usuario ya están en uso.");
    }

    //Encriptamos la contraseña antes de guardarla usando bcrypt
    const hashedPassword = await bcrypt.hash(UserData.password, 10);

    /// Si no envía un rol, asignar el rol por defecto
    let roleId = UserData.role;

    if (!roleId) {
      const defaultRole = await Role.findOne({ name: "arbitro" });
      if (!defaultRole) {
        throw new Error("Rol por defecto no encontrado. Contacte al administrador.");
      }
      roleId = defaultRole._id;
    }

    //Creamos una nueva instancia del usuario del modelo User con los datos recibidos
    const user = new User({
      ...UserData,
      password: hashedPassword,
      role: roleId

    });

    //Guardamos el usuario en la base de datos
    await user.save();
    await user.populate({
      path: "role",
      populate: { path: "permission" }
    });



    //Convertimos el objeto moongose a un objeto plano
    const userResponse = user.toObject();

    //Eliminamos la contraseña por seguridad
    delete userResponse.password;

    //Generamos un token jwt para el usuario registrado
    const token = this.generateToken(user);

    //Retomamos el usuario (sin password) y el token
    return { user: userResponse, token };
  }

  async login(email, password) {
    //Buscamos el usuario por su email
    const user = await User.findOne({ email })
      .populate({
        path: "role",
        populate: { path: "permission" }
      });


    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    //Verificamos si la contraseña es correcta
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Correo o contraseña incorrecta");
    }

    //Convertimos el usuario a objeto plano y eliminamos la contraseña
    const userResponse = user.toObject();
    delete userResponse.password;

    //Generamos u nuevo token y retornamos la respuesta
    const token = this.generateToken(user);
    return { user: userResponse, token, message: "Login exitoso" };
  }


  //Metodo para generar un token JWT
  generateToken(user) {
    const permissions = user.role.permission.map(p => p.name);
    //Generamos un token que incluye el id y el rol del usuario
    return jwt.sign(
      {
        id: user._id,
        role: user.role.name,
        permissions
      },
      //usamos la clave secreta del .env
      process.env.JWT_SECRET,
      //El token expira en 24hs
      { expiresIn: "24h" }
    );
  }
}

export default new AuthService();