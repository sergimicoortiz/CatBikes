import React, { useEffect, useState, useContext, useCallback } from "react";
import { toast } from 'react-toastify';
import NotificationsContext from "../context/NotificationsContext";
import NotificationsService from "../services/NotificationsService";

export function useNotifications() {
    const { notifications, setNotifications } = useContext(NotificationsContext);

    const useSeeNotification = useCallback((id) => {
        NotificationsService.UpdateSeen(id)
            .then(({ data, status }) => {
                if (status === 200) {
                    setNotifications(notifications.filter(item => item.id !== id));
                    toast.info('Notification seen');
                }
            })
            .catch(e => console.error(e))
    }, [notifications]);

    return {
        notifications,
        setNotifications,
        useSeeNotification
    }
}