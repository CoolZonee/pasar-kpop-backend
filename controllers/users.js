import User from "../models/user.js";

export const getUsers = async(req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}