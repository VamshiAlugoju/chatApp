import React, { JSXElementConstructor } from "react";
import "./chatpanel.css";
import { Avatar } from "@mui/material";
import SendText from "./SendText";
import Messageitem from "../messageItem/MessageItem";
import ScrollableFeed from "react-scrollable-feed";
import { InsertComment } from "@mui/icons-material";
type ChatPanelProps = {
  chatId?: string;
};

export default function ChatPanel(props: ChatPanelProps) {
  const [showMessages, setShowMessages] = React.useState(true);
  const [showProfile, setshowProfile] = React.useState(false);
  function toggleProfile() {
    setshowProfile((prev) => !prev);
    setShowMessages((prev) => !prev);
  }
  const [messagesData, setMessagesData] = React.useState([
    true,
    false,
    true,
    true,
    false,
  ]);
  function sendMessage() {
    setMessagesData((prev) => {
      return [...prev, true];
    });
  }
  return (
    <>
      <div className="chatPanel">
        <div className="chatPanel_nav">
          <div className="chatPanel_user">
            <span onClick={toggleProfile}>
              <Avatar />
            </span>
            <div className="ch_nav_details">
              <p className="ch_nav_name">andrei joseph</p>
              <p className="  "> online</p>
            </div>
          </div>
        </div>
        {showMessages && chatPanelChats(messagesData)}
        {showProfile && chatPanelProfile()}
        {showMessages && (
          <div className="chatPanel_send">
            <SendText sendMessage={sendMessage} />
          </div>
        )}
      </div>
    </>
  );
}

function chatPanelChats(messagesData) {
  // const items = [true, false, true, true, false];
  return (
    <div className="chatPanel_chat">
      <ScrollableFeed forceScroll={true}>
        {messagesData.map((item: boolean) => {
          console.log(item);
          return <Messageitem other={item} image="" />;
        })}
      </ScrollableFeed>
    </div>
  );
}

function chatPanelProfile() {
  return <div className="chatPanel_chat"></div>;
}
