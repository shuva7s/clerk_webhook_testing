import Post from "@/lib/database/models/post.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  let page = Number(searchParams.get("page"));
  const limit = 6;
  const skip = page * limit; // Number of posts to skip
  try {
    await connectToDatabase();
    const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit); 
    // const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
  }
}
