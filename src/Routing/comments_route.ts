import express from 'express';
const router = express.Router()
import CommentsController from '../Controllers/comments_controller';
import authenticate from '../Common/auth_middleware'

router.post('/post/:postId/comments', authenticate, CommentsController.post.bind(CommentsController));
router.get('/post/:postId/comments',authenticate, CommentsController.get.bind(CommentsController));
router.delete('/post/:postId/comments/:commentId', authenticate, CommentsController.delete.bind(CommentsController)); 

export default router;
