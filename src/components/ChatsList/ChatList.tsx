/* eslint-disable react-refresh/only-export-components */
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ChatItem from "../chatItem/ChatItem";
import "./chatlist.css";
import { ReactElement } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function () {
  const arr = [
    {
      Name: "vamshi",
      src: "str",
      Lastmessage:
        "this is last message i wna=jf;ls ;sdljf ;f;psdojf psj;spo ffpsdjf;oj sdd;fojs ;ofdspofj daspf",
    },
    {
      Name: "Ramshi",
      src: "str",
      Lastmessage: "this is last",
    },
  ];
  const [chats, setchats] = React.useState(arr);
  const [showSendOptions, setSendOptions] = React.useState(false);
  return (
    <>
      <div className="chatList">
        <div className="chatlist_top_div">
          <p>Messages</p>
          <button
            onClick={() => {
              setSendOptions((prev) => !prev);
            }}
          >
            <AddIcon />
          </button>
          {showSendOptions && <OptionsPanel setSendOptions={setSendOptions} />}
        </div>
        <div className="chatList_chats">
          {chats.map((item) => {
            return (
              <ChatItem
                Name={item.Name}
                LastMsg={item.Lastmessage}
                src={item.src}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function OptionsPanel(props: any): ReactElement {
  return (
    <>
      <div className="sendOptions">
        <div className="button_div">
          <button
            onClick={() => {
              props.setSendOptions((prev: any) => !prev);
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="sendOptionsVals">
          <ul>
            <li>Create Group</li>
            <li>Search People</li>
          </ul>
        </div>
      </div>
    </>
  );
}
