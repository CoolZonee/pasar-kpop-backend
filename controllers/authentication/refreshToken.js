import 'dotenv/config';
import jwt from 'jsonwebtoken'
import RefreshToken from "../../models/refreshTokenModel.js";
import { generateAccessToken } from './auth.js';

export const getRefreshToken = async(token) => {
    try {
        const refreshToken = await RefreshToken.findOne({ token: token })
        if (refreshToken) return true
        return false
    } catch (error) {
        return false
    }
}

export const addRefreshToken = async(token) => {
    const newToken = new RefreshToken(token)
    try {
        await newToken.save((err) => { if (err) console.log(err) })
    } catch (error) {
        return error
    }
}

export const deleteRefreshToken = async(token) => {
    try {
        await RefreshToken.findOneAndDelete({
            token: token
        })
        return
    } catch (error) {
        return error
    }
}

export const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken
    if (token == null) return res.status(401).send()
    if (!getRefreshToken(token)) return res.status(403).send()
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send()
        const accessToken = generateAccessToken({ name: user.name })
        res
            .cookie("accessToken", accessToken, {
                httpOnly: true
            })
            .cookie("refreshToken", req.cookies.refreshToken, {
                    httpOnly: true
                })
            .status(200)
            .send()
    })
}