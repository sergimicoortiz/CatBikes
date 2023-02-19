import React from "react";
import Notification from "../../components/Notification/Notification";
import { useNotifications } from "../../hooks/useNotifications";

const NotificationUser = () => {
    const { notifications, useSeeNotification } = useNotifications();
    const notifications_html =
        notifications.length > 0 ? (
            notifications.map((item) => (
                <Notification
                    notification={item}
                    key={item.id}
                    seeNotification={useSeeNotification}
                />
            ))
        ) : (
            <p>No Notifications</p>
        );
    return <>{notifications_html}</>;
};

export default NotificationUser;
