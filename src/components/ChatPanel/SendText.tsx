import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import "./sendtext.css";

type sendTextProps = {
  sendMessage: () => void;
};
export default function SendText(props: sendTextProps) {
  function sendAction() {
    props.sendMessage();
  }

  return (
    <>
      <div className="send_text">
        <div className="sendMessage_icon">
          <AttachFileIcon />
        </div>
        <div className="sendMessage_right_div">
          {/* <textarea name="sendMessage" id="sendMessage"></textarea> */}
          <input type="text" />
          <span onClick={sendAction} className="sendIcon_span">
            <SendIcon />
          </span>
        </div>
      </div>
    </>
  );
}
