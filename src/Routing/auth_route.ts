import express from 'express';
const router = express.Router()
import Auth from '../Controllers/auth_controller';

router.post('/register', Auth.register);

router.post('/login', Auth.login);

router.post('/logout', Auth.logout);

export default router;
