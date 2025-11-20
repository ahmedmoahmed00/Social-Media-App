import { useEffect, useState } from "react";
import ChatSection from "../../features/Chat/components/ChatSection";
import FriendsSidebar from "../../features/Chat/components/FriendsSidebar";

function Chat() {
  const [friendSelected, setFriendSelected] = useState(null);

  useEffect(() => {
    console.log(friendSelected);
  }, [friendSelected]);

  return (
    <div className="flex gap-4 max-[767px]:flex-col relative items-stretch mx-4 max-w-7xl mb-5  ">
      <div>
        <FriendsSidebar
          friendSelected={friendSelected}
          setFriendSelected={setFriendSelected}
        />
      </div>
      <div className="flex-1  max-[767px]:absolute bg-white left-0 z-10 rounded-lg right-0  ">
        <ChatSection
          setFriendSelected={setFriendSelected}
          friendSelected={friendSelected}
        />
      </div>
    </div>
  );
}

export default Chat;
