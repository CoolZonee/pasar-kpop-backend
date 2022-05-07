import jwt from "jsonwebtoken";
import 'dotenv/config';
import { addRefreshToken, deleteRefreshToken } from "./refreshToken.js";
import User from "../../models/userModel.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    const body = req.body
    try {
        
        let user = await User.findOne({
            username: body.username
        }).exec()
    
        const match = await bcrypt.compare(body.password, user.password);
 
        if (!match) return res.status(404).json({message: "Wrong Credentials"})

        user.password = undefined

        const accessToken = generateAccessToken({ name: body.email })
        const refreshToken = jwt.sign({ name: body.email }, process.env.REFRESH_TOKEN_SECRET)
        addRefreshToken({ "token": refreshToken })
            .then(res
                .cookie("accessToken", accessToken, {
                    httpOnly: true,
                    // secure: true
                })
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true
                })
                .status(200)
                .json(user))
            .catch((error) => {
                res.status(500).json({ message: error.message })
            })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    deleteRefreshToken(refreshToken)
        .then(() => {
            return res
                .clearCookie("accessToken")
                .clearCookie("refreshToken")
                .status(200)
                .send()
        })
        .catch((error) => {
            res.status(403).json({ message: error.message })
        })
}

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' })
}

export const getHashed = async (req, res) => {
    const pw = req.body.pw
    
    const hashed = await bcrypt.hash(pw, 10)
    res.status(200).json(hashed)
}