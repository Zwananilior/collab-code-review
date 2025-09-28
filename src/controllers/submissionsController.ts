import { Request, Response } from 'express';
import { pool } from '../db';

export async function createSubmission(req: Request, res: Response) {
  const { project_id, title, content, filename } = req.body;
  const submitter = (req as any).user?.userId || null;
  const result = await pool.query(
    'INSERT INTO submissions (project_id, title, content, filename, submitter_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [project_id, title, content, filename, submitter]
  );
  res.status(201).json(result.rows[0]);
}

export async function listByProject(req: Request, res: Response) {
  const projectId = req.params.id;
  const result = await pool.query('SELECT * FROM submissions WHERE project_id=$1', [projectId]);
  res.json(result.rows);
}

export async function getSubmission(req: Request, res: Response) {
  const id = req.params.id;
  const result = await pool.query('SELECT * FROM submissions WHERE id=$1', [id]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
  res.json(result.rows[0]);
}

export async function updateStatus(req: Request, res: Response) {
  const id = req.params.id;
  const { status } = req.body;
  await pool.query('UPDATE submissions SET status=$1, updated_at=NOW() WHERE id=$2', [status, id]);
  res.status(204).end();
}

export async function deleteSubmission(req: Request, res: Response) {
  const id = req.params.id;
  await pool.query('DELETE FROM submissions WHERE id=$1', [id]);
  res.status(204).end();
}

export async function approveSubmission(req: Request, res: Response) {
  const id = req.params.id;
  const reviewer = (req as any).user?.userId || null;
  await pool.query('INSERT INTO reviews (submission_id, reviewer_id, action) VALUES ($1,$2,$3)', [id, reviewer, 'approve']);
  await pool.query('UPDATE submissions SET status=$1 WHERE id=$2', ['approved', id]);
  res.status(200).json({ ok: true });
}

export async function requestChanges(req: Request, res: Response) {
  const id = req.params.id;
  const reviewer = (req as any).user?.userId || null;
  const { comment } = req.body;
  await pool.query('INSERT INTO reviews (submission_id, reviewer_id, action, comment) VALUES ($1,$2,$3,$4)', [id, reviewer, 'request_changes', comment]);
  await pool.query('UPDATE submissions SET status=$1 WHERE id=$2', ['changes_requested', id]);
  res.status(200).json({ ok: true });
}

export async function reviewsForSubmission(req: Request, res: Response) {
  const id = req.params.id;
  const r = await pool.query('SELECT * FROM reviews WHERE submission_id=$1 ORDER BY created_at DESC', [id]);
  res.json(r.rows);
}
