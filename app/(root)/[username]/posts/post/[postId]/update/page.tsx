import { SignedIn, SignedOut, RedirectToSignIn, auth } from "@clerk/nextjs";
import UpdatePostForm from "@/components/shared/UpdatePostForm";
import { getPostByPostId } from "@/lib/actions/post.actions";

const UpdatePage = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  const post = await getPostByPostId(postId);
  const newPostObject = {
    imageUrl: post.imageUrl,
    title: post.title,
    content: post.content,
  };
  return (
    <main className="min-h-screen px-3 md:px-8 xl:px-10 max-w-[800px] mx-auto">
      <SignedIn>
        <UpdatePostForm postData={newPostObject} postId={postId}/>
      </SignedIn>
    </main>
  );
};

export default UpdatePage;

// console.log(newPostObject);
// const { sessionClaims } = auth();
// const Clerk_user_id = sessionClaims?.sub as string;
// const authorData = await getAuthorInfoNameById(Clerk_user_id);
