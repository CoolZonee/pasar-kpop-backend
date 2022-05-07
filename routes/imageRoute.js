import express from "express";
import { getImages, uploadImage } from "../controllers/images.js";
import multer from "multer";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const router = express.Router();


router.use('/uploads', express.static(__dirname + "/uploads"))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-'))
    }
})

const upload = multer({storage: storage})


router.get('/:imageName', getImages)

export default router