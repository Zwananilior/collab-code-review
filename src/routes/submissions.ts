import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { createSubmission, listByProject, getSubmission, updateStatus, deleteSubmission, approveSubmission, requestChanges, reviewsForSubmission } from '../controllers/submissionsController';

const router = Router();
router.use(requireAuth);

router.post('/', createSubmission);
router.get('/project/:id', listByProject);
router.get('/:id', getSubmission);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteSubmission);

router.post('/:id/approve', approveSubmission);
router.post('/:id/request-changes', requestChanges);
router.get('/:id/reviews', reviewsForSubmission);

export default router;
