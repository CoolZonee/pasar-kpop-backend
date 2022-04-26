import express from 'express'
import { getUsers } from '../controllers/users.js';
import { verifyToken } from '../controllers/authentication/verifyToken.js';

const router = express.Router()


router.get('/', verifyToken, getUsers)

export default router;