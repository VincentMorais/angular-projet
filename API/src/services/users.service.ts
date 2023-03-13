import HashPassword from '../commands/hashPassword';
import query from './db.service';
import { User } from '../models/users.models';
import CheckPassword from '../commands/checkPassword';

export async function getAllUsers() {
  const sql = 'SELECT * FROM Users';
  const users: User = await query(sql, []);

  return users;
}

export async function getUserByEmail(email: string) {
  const sql = 'SELECT * FROM Users WHERE email = ?';
  const user: User = await query(sql, [email]);

  return user;
}

export async function getUserByUsername(username: string) {
  const sql = 'SELECT * FROM Users WHERE username = ?';
  const user: User = await query(sql, [username]);

  return user;
}

export async function getUserById(id: number) {
  const sql = 'SELECT * FROM Users WHERE id = ?';
  const [user] = await query(sql, [id]);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function createUser(user: User) {
  const newPass = await HashPassword(user.password);
  const sql = 'INSERT INTO Users SET username=?, password=?, email=?, Adresse=?, role="client"';
  const [result] = await query(sql, [
    user.username,
    newPass,
    user.email,
    user.Adresse,
  ]);

  return result;
}

export async function updateUser(id: number, user: User) {
  const sql = 'UPDATE Users SET username=?, password=?, email=?, Adresse=?, role="client" WHERE id = ?';
  const [result] = await query(sql, [user, id]);

  return result;
}

export async function patchUser(id: number, user: User) {
  const sql = 'UPDATE Users SET ? WHERE id = ?';
  const [result] = await query(sql, [{ user }, id]);

  return result;
}

export async function deleteUser(id: number) {
  const sql = 'DELETE FROM Users WHERE id = ?';
  const [result] = await query(sql, [id]);

  return result;
}

export async function loginUser(username: string, password: string) {
  const sql = 'SELECT * FROM Users WHERE username=?';
  const [user] = await query(sql, [username]);

  if (user) {
    const check = await CheckPassword(password, user.password);
    if (check) {
      return user;
    }
    throw new Error('Username or password incorrect');
  } else {
    throw new Error('Username or password incorrect');
  }
}
