import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";

function FormSearch({ onSubmit }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { search: "" },
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex justify-between items-center gap-2 relative">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search users..."
            {...register("search")}
            className="border border-gray-300 rounded-md placeholder:text-black text-primary dark:text-dark-primary duration-200 dark:placeholder:text-white py-2 px-3 w-full focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          aria-label="Search users"
          className="bg-dark-primary dark:bg-primary text-dark-primary dark:text-primary flex items-center justify-center cursor-pointer hover:bg-black/70 dark:hover:bg-gray-300 gap-2 py-2 px-4 rounded-md"
        >
          <BiSearch className="size-6" />
        </button>
      </div>
    </form>
  );
}

export default FormSearch;
