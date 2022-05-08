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

// generate random 10 string
const getRandom10String = () => {
    let result = ""
    const ch = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789"

    for (let i = 0; i < 10; i++) {
        result += ch.charAt(Math.floor(Math.random() * ch.length))
    }
    return result
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // destination folder in root directory
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        // change the upload's file name
        const imageName = file.originalname.split(".")
        // exp name: image + 123456789 + . + jpg
        cb(null, "image" + Date.now() + getRandom10String() + "." + imageName[1])
    }
})

const upload = multer({ storage: storage })



router.get('/', verifyToken, getPosts)
router.post('/', verifyToken, upload.single('image'), createPost)
router.put('/', verifyToken,  updatePost)
router.put('/like-post', verifyToken, likePost)

export default router;