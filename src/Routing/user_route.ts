import express from 'express';
const router = express.Router()
import User from '../Controllers/user_controller';
import authnticate from '../Common/auth_middleware';

router.get('/',  User.getAll.bind(User));

router.get('/:id', User.get.bind(User));

router.post('/', User.post.bind(User));

router.put('/:id', User.put.bind(User));

router.delete('/:id', User.delete.bind(User));

export default router;
