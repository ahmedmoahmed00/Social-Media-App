import { useEffect } from "react";
import Input from "../../../components/form/Input";
import useUserData from "../../../hooks/queryHooks/useUserData";
import useGetUserFriends from "../hooks/Friends/useGetUserFriends";
import FriendCard from "./FriendCard";
import FriendCardSkeleton from "./ui/FriendCardSkeleton";
import { useState } from "react";
function FriendsSidebar({ friendSelected, setFriendSelected }) {
  const [searchValue, setSearchValue] = useState("");
  const user = useUserData();

  let dataFiltered = [];

  const { data, isLoading } = useGetUserFriends(user?.id);

  useEffect(() => {
    if (friendSelected) {
      setFriendSelected(friendSelected);
    }
  }, [friendSelected, setFriendSelected]);

  dataFiltered = searchValue
    ? data.filter((friend) =>
        friend.full_name
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase())
      )
    : data;

  return (
    <div className="flex h-full ">
      <div className="min-[767px]:w-[320px]  max-[767px]:h-[720px] w-full border dark:border-gray-600 border-gray-200 rounded-lg flex-shrink-0">
        <div className="w-full flex flex-col gap-5 mb-5">
          <div className="p-4">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search conversations..."
            />
          </div>
          <div className="divide-y w-full divide-gray-300">
            {isLoading && (
              <div className="w-full space-y-2">
                <FriendCardSkeleton />
                <FriendCardSkeleton />
                <FriendCardSkeleton />
              </div>
            )}
            {dataFiltered?.length > 0 ? (
              dataFiltered?.map((friend) => (
                <button
                  onClick={() => setFriendSelected(friend)}
                  key={friend.id}
                  className="cursor-pointer w-full"
                >
                  <FriendCard
                    friend={friend}
                    isActive={friendSelected?.id === friend?.id}
                  />
                </button>
              ))
            ) : (
              <h2 className="text-2xl font-semibold text-gray-300 text-center">
                Not Found
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendsSidebar;
