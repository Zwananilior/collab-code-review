import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { addComment, listComments, updateComment, deleteComment } from '../controllers/commentsController';

const router = Router();
router.use(requireAuth);

router.post('/:submissionId', addComment);
router.get('/:submissionId', listComments);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
