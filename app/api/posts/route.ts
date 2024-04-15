import Post from "@/lib/database/models/post.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const topics = await Post.find();
    return NextResponse.json({ topics });
  } catch (error) {
    console.log(error);
  }
}
