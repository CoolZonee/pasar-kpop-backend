import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    imageName: String,
    creator: Object,
    avatarName: String,
    price: String,
    isIncludePos: Boolean,
    group: [String],
    category: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
})

postSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
  });
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;