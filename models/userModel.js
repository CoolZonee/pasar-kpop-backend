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
  
const User = mongoose.model('User', userSchema);

// Duplicate the ID field.
userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

export default User;