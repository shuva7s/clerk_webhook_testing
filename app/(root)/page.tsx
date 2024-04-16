
import PostContainer from "@/components/shared/PostContainer";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col px-3 md:px-8 xl:px-10">
      <PostContainer />
    </main>
  );
}
