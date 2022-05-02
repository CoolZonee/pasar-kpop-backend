import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    avatarName: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
})

userSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
});
  
const User = mongoose.model('User', userSchema);

export default User;