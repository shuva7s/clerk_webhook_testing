"use client"

import { likePost } from "@/lib/actions/post.actions";
import { useState } from "react";
import { Button } from "../ui/button";

type postType = {
    postId: string;
    likedArray: string[];
    currentlyLoggedInUserName: string;
}

// post._id
// currentlyLoggedInUserName
// post.likes.length
const ClientInteractionToPost = ({ postId, likedArray, currentlyLoggedInUserName }: postType) => {
    const [likeCount, setLikeCount] = useState(likedArray.length);
    const [hasLiked, setHasLiked] = useState(likedArray.includes(currentlyLoggedInUserName));

    const handleLike = async () => {
        try {
            const alreadyLiked = await likePost(postId, currentlyLoggedInUserName);
            if (!alreadyLiked) {
                setLikeCount(likeCount + 1);
            }
            setHasLiked(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex gap-4 items-center mt-4">
            <p>Likes: {likeCount}</p >
            <Button onClick={handleLike}>{hasLiked ? 'Liked' : 'Like'}</Button>
        </div>
    )
}

export default ClientInteractionToPost