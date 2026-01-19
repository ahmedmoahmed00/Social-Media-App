import { useParams } from "react-router-dom";
import useUserData from "../../hooks/queryHooks/useUserData";
import useGetUserData from "../../features/Profile/hooks/User/useGetUserData";
import HeadrProfile from "../../features/Profile/components/HeadrProfile";
import { useState } from "react";
import ProfileTabs from "../../features/Profile/components/ProfileTabs";
import useGetPostsByID from "../../features/Profile/hooks/Posts/useGetPostsByID";
import ShowPostsProfilePage from "../../features/Profile/components/ShowPostsProfilePage";
import ShowMediaProfilePage from "../../features/Profile/components/ui/ShowMediaProfilePage";

function Profile() {
  const { id } = useParams();
  const user = useUserData();

  const [sectionActive, setSectionActive] = useState("posts");

  const profileOwnUser = id === undefined || id === user.id;

  let userID = profileOwnUser ? user.id : id;

  const { posts, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetPostsByID(userID);

  const { data: userData, isLoading: isLoadingUser } = useGetUserData(userID);

  if (isLoading || isLoadingUser) {
    return;
  }

  const handleSectionChange = (section) => {
    setSectionActive(section);
  };

  const handleReachEnd = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return (
    <div className="mx-4 max-w-5xl md:mx-auto ">
      <div>
        <HeadrProfile
          friendID={id}
          userID={user.id}
          profileUserId={userID}
          user={userData[0]}
          isProfileOwnUser={profileOwnUser}
          postsCount={posts?.length}
        />
      </div>
      <div>
        <ProfileTabs onChange={handleSectionChange} />
      </div>
      <div>
        {sectionActive === "posts" && (
          <ShowPostsProfilePage handleReachEnd={handleReachEnd} posts={posts} />
        )}
        {sectionActive === "media" && (
          <ShowMediaProfilePage handleReachEnd={handleReachEnd} posts={posts} />
        )}
      </div>
    </div>
  );
}

export default Profile;
