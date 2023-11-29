import React from "react";
import "./messageitem.css";
import { Avatar } from "@mui/material";

type messageItemProps = {
  message?: string;
  other?: boolean;
  time?: string;
  image?: string;
};

export default function Messageitem(props: messageItemProps) {
  return (
    <>
      <div className={`message_item ${props.other ? "other" : "me"}`}>
        <div className={`message_content ${props.other ? "other" : "me"}`}>
          {/* <div className="message_image"> */}
          {/* <Avatar src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /> */}
          {/* <img
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            /> */}
          {/* </div> */}
          <div className="message_div">
            <div
              className={`message_item_Name ${props.other ? "other" : "me"}`}
            >
              <p>.{props.other ? "Joseph" : "You"}</p>
              <p className="message_time">props.time</p>
            </div>
            <div className={`message_value ${props.other ? "other" : "me"}`}>
              <div className={`message_text ${props.other ? "other" : "me"}`}>
                {props.message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
