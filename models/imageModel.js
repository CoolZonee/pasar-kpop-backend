import mongoose from "mongoose";

const imageSchema = mongoose.Schema({

    img: {
        data: Buffer,
    }
})

const Image = mongoose.model('image', imageSchema)

export default Image;