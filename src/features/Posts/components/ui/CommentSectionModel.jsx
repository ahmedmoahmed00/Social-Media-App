import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";

function CommentSectionModel({ children, onClose }) {
  const ref = useOutsideClick(onClose);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="h-screen md:h-fit">
      <div className="fixed z-50 hidden md:block inset-0 bg-black/30 "></div>
      <div
        ref={ref}
        className="flex border rounded-t-lg border-primary shadow-lg flex-col w-screen h-full md:h-fit  z-100 gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary dark:bg-dark-primary p-4 md:w-[95%] max-w-2xl md:rounded-lg"
      >
        <header className="flex items-center justify-between border-b border-b-primary dark:border-dark-primary pb-4">
          <h1 className="font-semibold dark:text-dark-primary text-lg lg:text-xl">
            Comments
          </h1>
          <button
            aria-label="close Model"
            onClick={onClose}
            className=" w-fit ml-auto cursor-pointer dark:text-dark-primary"
          >
            <IoCloseOutline className="size-5" />
          </button>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default CommentSectionModel;
