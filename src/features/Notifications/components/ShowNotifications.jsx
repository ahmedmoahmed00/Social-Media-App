import ShowNotificationsFriends from "./ShowNotificationsFriends";

function ShowNotifications({ notificationsActive }) {
  return (
    <div>
      {notificationsActive === "friends" && <ShowNotificationsFriends />}
    </div>
  );
}

export default ShowNotifications;
