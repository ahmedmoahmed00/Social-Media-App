import { MdLogout } from "react-icons/md";
import useSignOut from "../../hooks/useSignOut";
import Loader from "../../../../components/ui/Loader";

function SignOutSection() {
  const { signOut, isLoading } = useSignOut();

  if (isLoading) {
    return <Loader />;
  }

  const handelSignOut = () => {
    signOut();
  };

  return (
    <div className="flex items-center justify-between flex-wrap ">
      <div>
        <h2 className="font-semibold text-primary dark:text-dark-primary">
          Sign Out
        </h2>
        <p className="text-sm text-gray-500">
          Sign out of your account on this device
        </p>
      </div>
      <div className="mt-4 md:mt-0">
        <button
          className=" px-4 py-2 text-sm flex items-center gap-2 bg-primary border border-primary text-primary font-semibold text-md rounded-lg  transition"
          onClick={handelSignOut}
        >
          <span>
            <MdLogout size={18} />
          </span>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SignOutSection;
