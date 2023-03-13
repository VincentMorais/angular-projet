import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  patchUser,
  getUserByEmail,
  getUserByUsername,
} from '../services/users.service';
import { User } from '../models/users.models';
import DecodeToken from '../utils/decodeToken';

export async function getAllUsersHandler(req: any, res: any) {
  try {
    const users: User = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getUserByIdHandler(req: any, res: any) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message, status: 404 });
    } else {
      res.status(500).json(error);
    }
  }
}

export async function createUserHandler(req: any, res: any) {
  try {
    const user: User = req.body;

    const newUser: User = await getUserByEmail(user.email);
    if (newUser.email === user.email) {
      console.log('User already exists with this email really');
      throw new Error('User with this email already exists');
    }

    const newUser2 = await getUserByUsername(user.username);
    if (newUser2.username === user.username) {
      throw new Error('User with this username already exists');
    }

    const result = await createUser(user);
    res.status(201).json({ message: 'User created', result, status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message, status: 400 });
    } else {
      res.status(500).json(error);
    }
  }
}

export async function updateUserHandler(req: any, res: any) {
  try {
    const { id } = req.params;
    const user: User = req.body;
    const result = await updateUser(id, user);
    res.status(200).json({ message: 'User updated successfully', result });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function patchUserHandler(req: any, res: any) {
  try {
    const { id } = req.params;
    const user: User = req.body;
    const result = await patchUser(id, user);
    res.status(200).json({ message: 'User updated successfully', result });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function deleteUserHandler(req: any, res: any) {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getMeHandler(req: any, res: any) {
  try {
    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    const user: User = DecodeToken(token);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
