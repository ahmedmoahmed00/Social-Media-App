function ListsNotifications({ setNotificationsActive }) {
  return (
    <div className="w-full p-2 bg-gray-200 rounded-lg">
      <p
        className="text-center text-primary  font-semibold py-3 rounded-lg dark:bg-dark-primary dark:text-dark-primary cursor-pointer dark:bg-dark-third bg-white"
        onClick={() => setNotificationsActive("friends")}
      >
        Friends Requests
      </p>
    </div>
  );
}

export default ListsNotifications;
