import CreatePost from "../../features/Posts/components/CreatePost";
import ShowPosts from "../../features/Posts/components/ShowPosts";

function Home() {
  return (
    <div className="max-w-[720px] mx-auto flex flex-col gap-4">
      <div>
        <CreatePost />
      </div>
      <div>
        <ShowPosts />
      </div>
    </div>
  );
}

export default Home;
