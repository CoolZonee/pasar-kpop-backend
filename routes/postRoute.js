import express from 'express'
import { verifyToken } from '../controllers/authentication/verifyToken.js';
import { getPosts, createPost, updatePost, likePost } from '../controllers/posts.js';
import multer from "multer";

import { dirname } from "path";
import { fileURLToPath } from "url";


const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

router.use('/uploads', express.static(__dirname + "/uploads"))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const imageName = file.originalname.split(".")
        cb(null, "image" + Date.now() + "." + imageName[1])
    }
})

const upload = multer({storage: storage})

router.get('/', verifyToken, getPosts)
router.post('/', verifyToken, upload.single('image'), createPost)
router.put('/', verifyToken,  updatePost)
router.put('/like-post', verifyToken, likePost)

export default router;