
import PostContainer from "@/components/shared/PostContainer";
// import LoadMore from "@/components/shared/LoadMore";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col px-5 md:px-8 xl:px-10">
      <PostContainer />
      {/* <LoadMore/> */}
    </main>
  );
}
