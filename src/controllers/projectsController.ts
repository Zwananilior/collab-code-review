import { Request, Response } from 'express';
import { pool } from '../db';

export async function createProject(req: Request, res: Response) {
  const { name, description } = req.body;
  const createdBy = (req as any).user?.userId || null;
  const result = await pool.query(
    'INSERT INTO projects (name, description, created_by) VALUES ($1,$2,$3) RETURNING *',
    [name, description, createdBy]
  );
  res.status(201).json(result.rows[0]);
}

export async function listProjects(req: Request, res: Response) {
  const result = await pool.query('SELECT * FROM projects');
  res.json(result.rows);
}

export async function addMember(req: Request, res: Response) {
  const projectId = req.params.id;
  const { userId, role } = req.body;
  await pool.query('INSERT INTO project_members (project_id, user_id, role) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING', [projectId, userId, role || 'member']);
  res.status(204).end();
}

export async function removeMember(req: Request, res: Response) {
  const { id: projectId, userId } = req.params;
  await pool.query('DELETE FROM project_members WHERE project_id=$1 AND user_id=$2', [projectId, userId]);
  res.status(204).end();
}
