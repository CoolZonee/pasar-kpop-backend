import express from 'express'
import { login, logout } from '../controllers/authentication/auth.js'
import { refreshToken } from '../controllers/authentication/refreshToken.js'
import { verifyToken } from '../controllers/authentication/verifyToken.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', verifyToken, logout)
router.post('/refresh-token', refreshToken)

export default router;