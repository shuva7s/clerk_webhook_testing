
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getPostByPostId, getUserNameFromClerkId } from "@/lib/actions/post.actions"
import ClientInteractionToPost from "@/components/shared/ClientInteractionToPost";
import { auth } from "@clerk/nextjs";
const PostDetails = async ({ params }: { params: { postId: string } }) => {
    const { postId } = params;
    const post = await getPostByPostId(postId);
    console.log(post)
    const { sessionClaims } = auth();
    const Clerk_user_id = sessionClaims?.sub as string;
    const currentlyLoggedInUserName = await getUserNameFromClerkId(Clerk_user_id);
    return (
        <main>
            <div className="flex w-full flex-col md:flex-row px-6 gap-6 mt-6">
                {
                    post.imageUrl !== "" &&
                    <div className="h-[85vh] w-full md:w-[40vw] bg-contain bg-no-repeat md:sticky top-6 max-md:bg-center"
                        style={{ backgroundImage: `url(${post.imageUrl})` }}
                    />
                }

                <div className="flex-grow py-6">
                    <div>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>By <span className="text-blue-600">@{post.authorName}</span></p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <ClientInteractionToPost postId={post._id.toString()} likedArray={post.likes} currentlyLoggedInUserName={currentlyLoggedInUserName} />
                    </div>
                    <div className="mt-6">
                        <div className="w-full flex items-center justify-between">
                            <p>Comments</p>
                            <Button>Add Comment</Button>
                        </div>
                        <div>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                            <p>Comment</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PostDetails