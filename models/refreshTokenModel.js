import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema({
    token: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

export default RefreshToken;