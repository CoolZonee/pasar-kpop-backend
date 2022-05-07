import express from 'express'
import { getUsers, getUser } from '../controllers/users.js';
import { verifyToken } from '../controllers/authentication/verifyToken.js';

const router = express.Router()


router.get('/', verifyToken, getUsers)
router.get('/:id', getUser)

export default router;