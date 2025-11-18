import { useState } from "react";
import ListsNotifications from "../../features/Notifications/components/ListsNotifications";
import ShowNotifications from "../../features/Notifications/components/ShowNotifications";
import HeaderNotifications from "../../features/Notifications/components/ui/HeaderNotifications";

function Notifications() {
  const [notificationsActive, setNotificationsActive] = useState("friends");
  return (
    <div className=" max-w-3xl mx-auto rounded-lg  p-4 ">
      <div className="mx-4 space-y-4">
        <HeaderNotifications />
        <ListsNotifications setNotificationsActive={setNotificationsActive} />
        <ShowNotifications notificationsActive={notificationsActive} />
      </div>
    </div>
  );
}

export default Notifications;
