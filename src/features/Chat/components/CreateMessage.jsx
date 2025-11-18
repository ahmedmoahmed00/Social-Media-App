import { useCallback, useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import useSendMessage from "../hooks/Chat/useSendMessage";

function CreateMessage({ userId, friendId }) {
  const [contentMessage, setContentMessage] = useState("");
  const { sendMessage, isLoading } = useSendMessage();

  const handelSendMessage = useCallback(() => {
    if (contentMessage.length <= 0) return;

    sendMessage({
      userId,
      friendId,
      contentMessage,
    });

    setContentMessage("");
  }, [contentMessage, userId, friendId, sendMessage]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handelSendMessage();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [handelSendMessage]);

  return (
    <div className="w-full flex items-center gap-3">
      <input
        className=" flex-1 p-2.5  bg-gray-200 rounded-lg outline-0 text-sm "
        value={contentMessage}
        onChange={(e) => setContentMessage(e.target.value)}
        type="text"
        placeholder="Type a message..."
      />
      <button
        onClick={() => handelSendMessage()}
        disabled={!contentMessage || isLoading}
        className="p-2.5 disabled:bg-gray-500 cursor-pointer disabled:pointer-events-none bg-black text-white rounded-lg"
        aria-label="Send Message"
      >
        <FiSend />
      </button>
    </div>
  );
}

export default CreateMessage;
