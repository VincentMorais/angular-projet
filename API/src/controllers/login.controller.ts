import { loginUser } from '../services/users.service';
import { User } from '../models/users.models';
import GenerateToken from '../utils/generateToken';

const loginHandler = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    const user: User = await loginUser(username, password);

    const token = await GenerateToken(user);

    res.json({
      message: 'You are logged',
      user,
      token,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json(error);
    }
  }
};

export default loginHandler;
