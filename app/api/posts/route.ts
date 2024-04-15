import { NextApiRequest, NextApiResponse } from 'next';
import Post from "@/lib/database/models/post.model";
import { connectToDatabase } from "@/lib/database/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || 0; // Get the page number from query parameters
    const limit = 3; // Number of posts per page
    const skip = page * limit; // Number of posts to skip

    try {
      await connectToDatabase();
      const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit); // Sort posts by createdAt in descending order
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
