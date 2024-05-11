import { Schema, model, models } from "mongoose";
import { date } from "zod";

const CommentSchema = new Schema({
  commentor: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

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
  likes: [
    {
      type: String,
    },
  ],
  comments: [CommentSchema], // Array of objects containing comments
});

const Post = models?.Post || model("Post", PostSchema);

export default Post;
