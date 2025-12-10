import authService from '../services/authService.mjs';

export const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(400).json({ message: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(401).json({ message: error.message });
  }
}