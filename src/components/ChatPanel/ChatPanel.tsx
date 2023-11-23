import React from "react";
import "./chatpanel.css";
type ChatPanelProps = {
  chatId?: string;
};

export default function ChatPanel(props: ChatPanelProps) {
  return (
    <>
      <div className="chatPanel">
        <div className="chatPanel_nav"></div>
        <div className="chatPanel_chat"></div>
        <div className="chatPanel_send"></div>
      </div>
    </>
  );
}
