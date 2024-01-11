import express from 'express';
const router = express.Router()
import Auth from '../Controllers/auth_controller';
import Autnticate from '../Common/auth_middleware';

router.post('/register', );

router.post('/login', );

router.get('/logout',Autnticate, Auth.logout);

router.get('/refresh', Auth.refresh);

export default router;
