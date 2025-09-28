import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { createProject, listProjects, addMember, removeMember } from '../controllers/projectsController';

const router = Router();
router.use(requireAuth);

router.post('/', createProject);
router.get('/', listProjects);
router.post('/:id/members', addMember);
router.delete('/:id/members/:userId', removeMember);

export default router;
