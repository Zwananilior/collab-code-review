import { Request, Response } from 'express';
import { pool } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  const hashed = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role',
    [name, email, hashed, role || 'submitter']
  );
  return res.status(201).json(result.rows[0]);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const userRes = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  if (userRes.rowCount === 0) return res.status(401).json({ error: 'Invalid credentials' });
  const user = userRes.rows[0];
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  return res.json({ token });
}
