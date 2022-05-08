import PostMessage from "../models/postModel.js";
import mongoose from "mongoose";
import fs from "fs";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.aggregate([{
            $lookup: {
                from: "users",
                localField: "likedBy",
                foreignField: "_id",
                pipeline: [{
                    $project: { "password": 0 }
                    
                }],
                as: "likedBy"
            }
        },
        {
            $lookup: {  
                from: "users",
                localField: "creator",
                foreignField: "_id",
                pipeline: [{
                    $project: { "password": 0 }
                }],
                as: "creator",
            }
        }
        ]
        );
        res.status(200).json(postMessages)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body

    const file = req.file
    
    try {
        post["imageName"] = file.filename
        const newPost = new PostMessage(post)
        await newPost.save()
        const postMessage = await PostMessage.aggregate([
            {
                $match: {"_id": newPost._id}
        },{

            $lookup: {
                from: "users",
                localField: "likedBy",
                foreignField: "_id",
                pipeline: [{
                    $project: { "password": 0 }
                    
                }],
                as: "likedBy"
            }
        },
        {
            $lookup: {  
                from: "users",
                localField: "creator",
                foreignField: "_id",
                pipeline: [{
                    $project: { "password": 0 }
                }],
                as: "creator",
            }
        }
        ]
        );
        res.status(201).json(postMessage);
    }
    catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const body = req.body
    let newPost = await PostMessage.findById(body.postId)
    newPost.likedBy.push({"$oid": body.userId})
    newPost.save()
    res.status(200).json(newPost)
}

export const likePost = async (req, res) => {
    const body = req.body

    let newPost = await PostMessage.findById(body.postId)

    let i = newPost.likedBy.indexOf(body.userId)
    if (i !== -1) {
        newPost.likedBy.splice(i, 1)
    } else {
        newPost.likedBy.push(mongoose.Types.ObjectId(body.userId))

    }
    newPost.save()
    res.status(200).json(newPost)
}