import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import "./sendtext.css";

type sendTextProps = {
  sendMessage: () => void;
};
export default function SendText(props: sendTextProps) {
  const [messageText, setMessageText] = React.useState("");
  function sendAction(e) {
    e.preventDefault();
    props.sendMessage(messageText);
  }

  return (
    <>
      <div className="send_text">
        <div className="sendMessage_icon">
          <AttachFileIcon />
        </div>
        <div className="sendMessage_right_div">
          {/* <textarea name="sendMessage" id="sendMessage"></textarea> */}
          <input type="text" value={messageText} />
          <span onClick={sendAction} className="sendIcon_span">
            <SendIcon />
          </span>
        </div>
      </div>
    </>
  );
}
