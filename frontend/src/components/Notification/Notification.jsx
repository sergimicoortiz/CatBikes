import React from "react";
import "./Notification.scss";

const Notification = ({ notification, seeNotification }) => {

    return (
        <div className="notification">
            <br />
            <div id="container">
                <div id="success-box" onClick={() => seeNotification(notification.id)}>
                    <div className="dot"></div>
                    <div className="dot two"></div>
                    <div className="face">
                        <div className="eye"></div>
                        <div className="eye right"></div>
                        <div className="mouth happy"></div>
                    </div>
                    <div className="shadow scale"></div>
                    <div className="message"><h1 className="alert">New Notification</h1><p>{notification.body}</p></div>
                </div>
            </div>
        </div>
    );
};

export default Notification;