import { Request, Response } from 'express';
import { pool } from '../db';

export async function addComment(req: Request, res: Response) {
  const submissionId = req.params.submissionId;
  const { body, line_number } = req.body;
  const author = (req as any).user?.userId || null;
  const r = await pool.query('INSERT INTO comments (submission_id, author_id, body, line_number) VALUES ($1,$2,$3,$4) RETURNING *', [submissionId, author, body, line_number]);
  res.status(201).json(r.rows[0]);
}

export async function listComments(req: Request, res: Response) {
  const submissionId = req.params.submissionId;
  const r = await pool.query('SELECT * FROM comments WHERE submission_id=$1 ORDER BY created_at', [submissionId]);
  res.json(r.rows);
}

export async function updateComment(req: Request, res: Response) {
  const id = req.params.id;
  const { body } = req.body;
  await pool.query('UPDATE comments SET body=$1, updated_at=NOW() WHERE id=$2', [body, id]);
  res.status(204).end();
}

export async function deleteComment(req: Request, res: Response) {
  const id = req.params.id;
  await pool.query('DELETE FROM comments WHERE id=$1', [id]);
  res.status(204).end();
}
