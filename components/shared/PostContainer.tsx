import { getAllPosts, getUserNameFromClerkId } from "@/lib/actions/post.actions";
import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import ClientInteractionToPost from "./ClientInteractionToPost";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const PostContainer = async () => {
    const { sessionClaims } = auth();
    const Clerk_user_id = sessionClaims?.sub as string;
    const currentlyLoggedInUserName = await getUserNameFromClerkId(Clerk_user_id);
    const posts = await getAllPosts();
    return (
        <section className="columns-1 space-y-6 md:columns-2 gap-6 lg:columns-3">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="break-inside-avoid border p-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src={post.authorImage}
                                width={30}
                                height={30}
                                alt="Author-Image"
                                className="rounded-full"
                            />
                            <h3 className='text-blue-600'>@{post.authorName}</h3>
                        </div>

                        <div className="mt-4">
                            <p className="p-bold-16">{post.title}</p >
                            <p>{post.content}</p >
                            {
                                post.imageUrl &&
                                <Image
                                    src={post.imageUrl}
                                    width={400}
                                    height={400}
                                    alt="post-Image"
                                    className="w-full block"
                                />
                            }
                        </div>
                        <SignedIn>
                            <ClientInteractionToPost postId={post._id.toString()} likedArray={post.likes} currentlyLoggedInUserName={currentlyLoggedInUserName} />
                        </SignedIn>
                        <SignedOut>
                            <Button asChild className="mt-4">
                                <Link href="/sign-in">Like</Link>
                            </Button>
                        </SignedOut>
                    </div>
                ))
            ) : (
                <p>
                    No Posts to Show
                </p>
            )}
        </section >
    )
}

export default PostContainer;
