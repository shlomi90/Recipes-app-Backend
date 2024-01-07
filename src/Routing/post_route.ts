import express from 'express';
const router = express.Router()
import Post from  '../Controllers/post_controller';
import authenticate from '../Common/auth_middleware'

router.get('/',authenticate, Post.getAll.bind(Post));

router.get('/:id',authenticate, Post.get.bind(Post));

router.post('/',authenticate, Post.post.bind(Post));

router.put('/:id',authenticate, Post.put.bind(Post));

router.delete('/:id',authenticate, Post.delete.bind(Post));

export default router;
