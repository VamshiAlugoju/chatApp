import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import "./sendtext.css";
import UploadFile from "../models/UploadFile";
import { uploadFile } from "@dropzone-ui/react";

type sendTextProps = {
  sendMessage: (message: string) => void;
  toggleUpload ?: ()=>void;
  uploadFiles:(arrOfFiles: any)=>void
};
export default function SendText(props: sendTextProps) {
  const [showUpload , setShowUpload] = React.useState(false);
  const [messageText, setMessageText] = React.useState("");
  function sendAction(e) {
      e.preventDefault();
      props.sendMessage(messageText);
    
  }
  function closeModal(){
    console.log("called")
    setShowUpload(false);
  }

  return (
    <>
      <div className="send_text">
        <div onClick={()=>{setShowUpload(true)}} className="sendMessage_icon">
          <AttachFileIcon />
        </div>
        <div className="sendMessage_right_div">
          {/* <textarea name="sendMessage" id="sendMessage"></textarea> */}
          <input
            type="text"
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
            value={messageText}
          />
          <span onClick={sendAction} onKeyDown={sendAction} className="sendIcon_span">
            <SendIcon />
          </span>
        </div>
      </div>
      {showUpload && <UploadFile  uploadFiles={props.uploadFiles} showUpload={showUpload} closeModal={closeModal} />}
    </>
  );
}
