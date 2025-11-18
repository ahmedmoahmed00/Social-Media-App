import { useLayoutEffect, useRef } from "react";
import useGetMessages from "../../hooks/Chat/useGetMessages";
import FriendCardSkeleton from "./FriendCardSkeleton";
import MessageContent from "./MessageContent";
import ScrollTrigger from "../../../Posts/components/ScrollTrigger";

function MessagesSection({ userId, friendId }) {
  const { dataMessages, isLoading, fetchNextPage, hasNextPage } =
    useGetMessages(userId, friendId);

  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const prevScrollHeightRef = useRef(0);

  useLayoutEffect(() => {
    if (isLoading) return;

    if (!dataMessages || dataMessages.length === 0) return;

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: "end" });
    }
  }, [isLoading, dataMessages?.length]);

  const handleFetchMore = async () => {
    const container = containerRef.current;
    if (!container) return;

    prevScrollHeightRef.current = container.scrollHeight;
    const prevScrollTop = container.scrollTop;

    await fetchNextPage();

    requestAnimationFrame(() => {
      const newScrollHeight = container.scrollHeight;
      container.scrollTop =
        newScrollHeight - (prevScrollHeightRef.current - prevScrollTop);
    });
  };

  if (isLoading) return <FriendCardSkeleton />;

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-3 overflow-auto h-full"
      style={{ scrollBehavior: "auto" }}
    >
      {hasNextPage && <ScrollTrigger onReach={handleFetchMore} />}

      {dataMessages?.map((message) => (
        <MessageContent
          key={message.id}
          message={message}
          isUser={message.sender_id === userId}
        />
      ))}

      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}

export default MessagesSection;
