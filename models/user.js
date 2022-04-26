import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    avatarName: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const User = mongoose.model('User', userSchema);

export default User;