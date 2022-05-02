import express from 'express'
import { verifyToken } from '../controllers/authentication/verifyToken.js';
import { getPosts, createPost, updatePost, likePost } from '../controllers/posts.js';

const router = express.Router()

router.get('/', getPosts)
router.post('/', verifyToken, createPost)
router.put('/', verifyToken, updatePost)
router.put('/like-post', verifyToken, likePost)

export default router;