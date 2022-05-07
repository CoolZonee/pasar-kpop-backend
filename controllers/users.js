import User from "../models/userModel.js";

export const getUsers = async(req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getUser = async(req, res) => {
    try {
        let user = await User.findById(req.params.id)
        user.password = undefined;
    
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}