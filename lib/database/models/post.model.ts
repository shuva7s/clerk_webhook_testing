import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    authorName: {
        type: String,
        required: true,
    },
    authorImage: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [{
        type: String,
    }]
});
const Post = models?.Post || model("Post", PostSchema);

export default Post;
