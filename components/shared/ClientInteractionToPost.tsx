"use client";

import { addCommentToPost, likePost } from "@/lib/actions/post.actions";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import AddComment from "./AddComment";

type postType = {
  postId: string;
  likedArray: string[];
  currentlyLoggedInUserName: string;
};

const ClientInteractionToPost = ({
  postId,
  likedArray,
  currentlyLoggedInUserName,
}: postType) => {
  const [likeCount, setLikeCount] = useState(likedArray.length);
  const [hasLiked, setHasLiked] = useState(
    likedArray.includes(currentlyLoggedInUserName)
  );

  const handleLike = async () => {
    try {
      const alreadyLiked = await likePost(postId, currentlyLoggedInUserName);
      if (alreadyLiked) {
        setLikeCount(likeCount - 1);
        setHasLiked(false);
      } else {
        setLikeCount(likeCount + 1);
        setHasLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (comment: string) => {
    try {
      // Call the function to add comment to the post
      await addCommentToPost(postId, currentlyLoggedInUserName, comment);
      // Optionally, you can update the UI to reflect the new comment
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex gap-4 items-center mt-4">
      <Button
        onClick={handleLike}
        variant="ghost"
        className="flex flex-row gap-2"
      >
        {hasLiked ? (
          <Image
            width={25}
            height={25}
            src="/fillHeart.svg"
            alt="heart filled"
            className="invert-image"
          />
        ) : (
          <Image
            width={25}
            height={25}
            src="/emptyHeart.svg"
            alt="heart filled"
            className="invert-image"
          />
        )}
        <span>{likeCount}</span>
      </Button>
      <AddComment commentor={currentlyLoggedInUserName} onSubmit={handleCommentSubmit} />
    </div>
  );
};

export default ClientInteractionToPost;
