import { useEffect, useState } from "react";
import HeaderSearch from "../../features/Search/components/HeaderSearch";
import FormSearch from "../../features/Search/forms/FormSearch";
import ShowUsers from "../../features/Search/components/ShowUsers";
import useGetsearchUsers from "../../features/Search/hooks/users/useGetsearchUsers";
import useUserData from "../../hooks/queryHooks/useUserData";

function Search() {
  const user = useUserData();

  const [users, setUsers] = useState([]);
  const [isFetchingSearchUsers, setIsFetchingSearchUsers] = useState(false);
  const { mutate: getSearchUsers, isPending, data } = useGetsearchUsers();

  const handleSearch = (contentSearch) => {
    if (contentSearch?.search?.length > 0) {
      getSearchUsers({ search: contentSearch.search, userID: user.id });
      setIsFetchingSearchUsers(true);
    }
  };

  useEffect(() => {
    setUsers(data || []);
  }, [data]);

  return (
    <div className=" max-w-2xl mx-auto rounded-lg  p-4 ">
      <HeaderSearch>
        <FormSearch onSubmit={handleSearch} />
      </HeaderSearch>

      <ShowUsers
        users={users}
        userId={user.id}
        isFetchingSearchUsers={isFetchingSearchUsers}
        isLoading={isPending}
      />
    </div>
  );
}

export default Search;
