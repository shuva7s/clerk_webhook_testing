import { SignedIn, SignedOut, RedirectToSignIn, auth } from "@clerk/nextjs";
import CreatePostForm from "@/components/shared/CreatePostForm";
import { getAuthorInfoNameById } from "@/lib/actions/user.actions";

const CreatePostPage = async () => {
    const { sessionClaims } = auth();
    const Clerk_user_id = sessionClaims?.sub as string;
    const authorData = await getAuthorInfoNameById(Clerk_user_id);
    return (
        <main className="min-h-screen px-3 md:px-8 xl:px-10 max-w-[800px] mx-auto">
            <SignedIn>
                <CreatePostForm authorData={authorData} />
            </SignedIn>

            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </main>
    )
}

export default CreatePostPage

