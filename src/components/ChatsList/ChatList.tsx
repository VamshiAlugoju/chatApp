import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ChatItem from "../chatItem/ChatItem";
import "./chatlist.css";
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
  return (
    <>
      <div className="chatList">
        <div className="chatlist_top_div">
          <p>Messages</p>
          <button>
            <AddIcon />
          </button>
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
