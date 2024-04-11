import { getPosts } from "@/lib/actions/post.actions";
import PostCard from "./PostCard";

export default async function PostContainer() {
    // const posts = await getPosts(1);
    const posts = await getPosts();
    console.log(posts);

    return (
        <section className="columns-1 space-y-6 md:columns-2 gap-6 lg:columns-3 mb-20">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard post={post} key={post._id} />
                ))
            ) : (
                <p>
                    No Posts to Show
                </p>
            )}
        </section>
    );
}
