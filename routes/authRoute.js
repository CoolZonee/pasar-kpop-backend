import express from 'express'
import { login, logout, getHashed } from '../controllers/authentication/auth.js'
import { refreshToken } from '../controllers/authentication/refreshToken.js'
import { verifyToken } from '../controllers/authentication/verifyToken.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', verifyToken, logout)
router.post('/refresh-token', refreshToken)
router.get('/get-hashed', getHashed) // for getting temporarily hashed pw

export default router;