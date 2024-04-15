"use server";

import Post from "../database/models/post.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

type CreatePostParams = {
  authorName: string;
  authorImage: string;
  title: string;
  content: string;
  imageUrl?: string; // Add this line
};

export async function createPost(postData: CreatePostParams) {
  try {
    await connectToDatabase();
    const savedPost = await Post.create({
      authorName: postData.authorName,
      authorImage: postData.authorImage,
      title: postData.title,
      content: postData.content,
      imageUrl: postData.imageUrl,
    });
    console.log(savedPost);
  } catch (error) {
    handleError(error);
  }
}

export async function getPostsByClerkId(clerkId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    if (!user) {
      console.log("User not found for clerkId:", clerkId);
      return [];
    }
    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    handleError(error);
    return []; // or throw an error if appropriate
  }
}

export async function getAllPosts() {
  try {
    await connectToDatabase();
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    handleError(error);
    return []; // or throw an error if appropriate
  }
}

const limit = 3;

export async function fetchPosts(page: number) {
  const response = await fetch(
    `https://clerk-webhook-testing.vercel.app/api/posts?page=${page}`
  );
  const data = await response.json();
  // console.log(data);
  // return data.topics;
}

export async function likePost(
  postId: string,
  currentlyLoggedInUserName: string
) {
  try {
    await connectToDatabase();
    const post = await Post.findById(postId);
    if (!post) {
      console.log("Post not found for postId:", postId);
      return;
    }
    if (post.likes.includes(currentlyLoggedInUserName)) {
      console.log("User has already liked this post");
      return true;
    }
    post.likes.push(currentlyLoggedInUserName);
    await post.save();
    console.log(post);
    return false;
  } catch (error) {
    handleError(error);
  }
}

export async function getUserIdFromClerkId(clerkId: string) {
  try {
    await connectToDatabase();
    // Find the user by their Clerk ID
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      console.log("User not found for clerkId:", clerkId);
      return null;
    }
    // Return the user's ObjectId
    return user._id.toString();
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function getUserNameFromClerkId(clerkId: string) {
  try {
    await connectToDatabase();
    // Find the user by their Clerk ID
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      console.log("User not found for clerkId:", clerkId);
      return null;
    }
    // Return the user's username
    return user.username;
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function getPostByPostId(postId: string) {
  try {
    await connectToDatabase();

    const post = await Post.findById(postId);

    if (!post) throw new Error("Post not found");

    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
