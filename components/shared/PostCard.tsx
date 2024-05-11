import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import ClientInteractionToPost from "./ClientInteractionToPost";
import { getUserNameFromClerkId } from "@/lib/actions/post.actions";
import DeletePost from "./DeletePost";

type postCardProp = {
  post: {
    _id: string;
    authorName: string;
    authorImage: string;
    title: string;
    content: string;
    imageUrl: string;
    likes: string[];
  };
};

const PostCard = async ({ post }: postCardProp) => {
  const { sessionClaims } = auth();
  const Clerk_user_id = sessionClaims?.sub as string;
  const currentlyLoggedInUserName = await getUserNameFromClerkId(Clerk_user_id);
  return (
    <div key={post._id} className="break-inside-avoid border p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={post.authorImage}
            width={30}
            height={30}
            alt="Author-Image"
            className="rounded-full"
          />
          <h3 className="text-blue-600">@{post.authorName}</h3>
        </div>
        <SignedIn>
          {currentlyLoggedInUserName === post.authorName && (
            <div className="flex gap-2">
              <Link href={`/${currentlyLoggedInUserName}/posts/post/${post._id}/update`}>
                <Button variant="outline">
                  <Image
                    src="/edit.svg"
                    alt="delete"
                    width={16}
                    height={16}
                    className="invert-image opacity-50"
                  />
                </Button>
              </Link>
              <DeletePost postId={post._id.toString()}></DeletePost>
            </div>
          )}
        </SignedIn>
      </div>
      <a href={`${post.authorName}/posts/post/${post._id}`}>
        <div className="mt-4">
          <p className="p-bold-16">{post.title}</p>
          <p>{post.content}</p>
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              width={300}
              height={300}
              alt="post-Image"
              className="w-full"
            />
          )}
        </div>
      </a>
      <SignedIn>
        <ClientInteractionToPost
          postId={post._id.toString()}
          likedArray={post.likes}
          currentlyLoggedInUserName={currentlyLoggedInUserName}
        />
      </SignedIn>
      <SignedOut>
        <Button asChild className="mt-4">
          <Link href="/sign-in">Like</Link>
        </Button>
      </SignedOut>
    </div>
  );
};

export default PostCard;
