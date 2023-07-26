import React from "react";
import "./Notifications.css";
import { getLatestNotification } from "./utils";
import close_icon from "./close-icon.png";

export default function Notification() {
  return (
    <div className="Notifications">
      <button
        style={{
          position: "absolute",
          background: "transparent",
          border: "none",
          right: "20px",
        }}
        aria-label="close"
        onClick={(e) => {
          console.log("Close button has been clicked");
        }}
      >
        <img src={close_icon} alt="close" height="15px" width="15px"></img>
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li data-priority="urgent" dangerouslySetInnerHTML={getLatestNotification()}></li>
      </ul>
    </div>
  );
}
