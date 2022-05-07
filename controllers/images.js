import Image from "../models/imageModel.js";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const getImages = async (req, res) => {
    const imageName = req.params.imageName
    try {
        res.status(200).download(process.cwd() + "/uploads/" + imageName)
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const uploadImage = async (req, res) => {
    console.log(req.body)
    try {
        const file = req.file
        const newImage = new Image({
            img: { data: fs.readFileSync(process.cwd() + "/uploads/" + file.filename) }
        })
        await newImage.save()
        res.status(201).json(newImage)

    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}