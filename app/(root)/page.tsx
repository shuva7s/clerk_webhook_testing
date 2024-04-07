
import PostContainer from "@/components/shared/PostContainer";
import Navbar from "@/components/shared/Navbar";
import NativeNavbar from "@/components/shared/NativeNavbar";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col px-5 md:px-8 xl:px-10">
      <Navbar />
      <PostContainer />
      <NativeNavbar />
    </main>
  );
}
