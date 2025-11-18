import MassagesSection from "./ui/MassagesSection";
import CreateMessage from "./CreateMessage";
import ChatHeader from "./ChatHeader";
import useUserData from "../../../hooks/queryHooks/useUserData";
import { BiMessageRounded } from "react-icons/bi";

function ChatSection({ setFriendSelected, friendSelected }) {
  const user = useUserData();

  if (!friendSelected) {
    return (
      <div className=" max-[767px]:hidden h-[720px] flex items-center justify-center border border-gray-200 rounded-lg">
        <div className="flex items-center flex-col">
          <BiMessageRounded className="size-20 mb-2" />
          <p className="text-gray-500 text-lg mb-2">Select a conversation</p>
          <p className="text-gray-500/70 text-sm">
            Choose from your existing conversations or start a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" gap-6 border dark:border-gray-600 dark:bg-dark-primary  flex-1 rounded-xl flex-col flex w-full border-gray-200">
      <ChatHeader
        setFriendSelected={setFriendSelected}
        friend={friendSelected}
      />

      <div className="h-[600px] flex flex-col">
        <div className="flex overflow-y-auto  flex-col  p-4 gap-4 flex-1 ">
          <MassagesSection
            userId={user.id}
            friendId={friendSelected?.friend_id || null}
          />
        </div>

        <div className="p-3 lg:p-4 border-t dark:border-gray-600 border-t-gray-200">
          <CreateMessage
            userId={user.id}
            friendId={friendSelected?.friend_id || null}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
