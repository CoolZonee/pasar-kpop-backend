import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    imageName: String,
    creator: [{type: mongoose.Types.ObjectId}],
    avatarName: String,
    price: String,
  isIncludePos: Boolean,
    likedBy: [{type: mongoose.Types.ObjectId}],
    group: [String],
    category: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema);

// Duplicate the ID field.
postSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
    virtuals: true
});

export default PostMessage;