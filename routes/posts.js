import express from 'express'
import { verifyToken } from '../controllers/authentication/verifyToken.js';
import { getPosts, createPost } from '../controllers/posts.js';

const router = express.Router()

router.get('/', verifyToken, getPosts)
router.post('/', verifyToken, createPost)

export default router;