import { useEffect, useState } from "react";
import useRemoveFriend from "../hooks/Friends/useRemoveFriend";
import useSendFriendRequest from "../hooks/Friends/useSendFriendRequest";
import useCheckIsFriend from "../hooks/Friends/useCheckIsFriend";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";
import useRemoveSendFriendRequest from "../hooks/Friends/useRemoveSendFriendRequest";
import { Link } from "react-router-dom";

function ActionsProfile({ userID, friendID }) {
  const { data: isFriend, isLoading } = useCheckIsFriend(userID, friendID);

  const { removeFriend } = useRemoveFriend();
  const { sendFriendRequest } = useSendFriendRequest();
  const { removeSendFriendRequest } = useRemoveSendFriendRequest();

  const [fakeIsFriend, setFakeIsFriend] = useState(isFriend);

  const [friendRequestSent, setFriendRequestSent] = useState(false);

  useEffect(() => {
    setFakeIsFriend(isFriend);
  }, [isFriend]);

  const handleFriendAction = () => {
    if (friendRequestSent) {
      handleCancelFriendRequest();
      return;
    }

    if (fakeIsFriend) {
      removeFriend({ userID, friendID });
      setFakeIsFriend(false);
    } else {
      sendFriendRequest({ userID, friendID });
      setFakeIsFriend(true);

      setFriendRequestSent(true);
    }
  };

  const handleCancelFriendRequest = () => {
    removeSendFriendRequest({ userID, friendID });
    setFriendRequestSent(false);
    setFakeIsFriend(false);
  };

  return (
    <div className="flex gap-2 justify-center  max-[767px]:my-4">
      <button
        onClick={handleFriendAction}
        className="p-2 cursor-pointer flex gap-2 items-center  md:ml-auto text-sm rounded-lg bg-black text-white"
      >
        {isLoading ? (
          "loading..."
        ) : fakeIsFriend ? (
          <>
            <FiUserMinus /> Unfriend
          </>
        ) : (
          <>
            <FiUserPlus size={16} /> Send Friend
          </>
        )}
      </button>
      <Link
        to={`/chat`}
        className="text-sm flex items-center dark:text-white dark:hover:bg-white/20 text-black p-1 font-semibold px-4 hover:bg-black/7 cursor-pointer rounded-lg border border-primary dark:border-dark-primary"
      >
        Message
      </Link>
    </div>
  );
}

export default ActionsProfile;
