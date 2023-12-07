import React, { JSXElementConstructor, useEffect } from "react";
import "./chatpanel.css";
import { Avatar } from "@mui/material";
import SendText from "./SendText";
import Messageitem from "../messageItem/MessageItem";
import ScrollableFeed from "react-scrollable-feed";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { recieverReducer } from "../../Store/reducers";
import { localUrl } from "../../helper/Baseurls";
import Header from "../../helper/constants";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "react-tooltip";

import AddPeopleModal from "../models/AddPeopleModal";
type ChatPanelProps = {
  chatId?: string;
};

export default function ChatPanel(props: ChatPanelProps) {
  const receiver = useSelector((state: any) => state.receiver);
  const user = useSelector((state: any) => state.user);
  const [showMessages, setShowMessages] = React.useState(true);
  const [showProfile, setshowProfile] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [showAddPeople, setShowAddPeople] = React.useState(false);
  const [messageData, setMessageData] = React.useState<any>([]);
  const [groupDetails, setGroupDetails] = React.useState<any>(null);
  const [isChatSelected, setIsChatSelected] = React.useState(() => {
    if (Object.keys(receiver).length === 0) return false;
    return true;
  });
  const isAdmin = groupDetails?.Admins.find((item: any) => {
    return item._id === user._id;
  });
  console.log("Adimin", isAdmin);
  function toggleProfile() {
    setshowProfile((prev) => !prev);
    setShowMessages((prev) => !prev);
  }
  async function sendMessage(message) {
    const payload = {
      message: message,
      time: Date.now().toLocaleString(),
      rec: receiver,
    };
    const messageData = {
      other: false,
      content: message,
      date: Date.now().toLocaleString(),
    };
    // send message ;

    const url = localUrl + "/chat/sendMessage";
    const headers = Header();
    let result = await axios.post(url, payload, headers);
    setMessageData((prev) => {
      return [...prev, messageData];
    });
  }

  useEffect(() => {
    (async () => {
      console.log(receiver);
      if (Object.keys(receiver).length !== 0) {
        setIsChatSelected(true);
        setShowLoader(true);
        const data = await loadChats(
          receiver._id,
          receiver.name,
          receiver.isGroup
        );
        if (receiver.isGroup && receiver.isGroup === true) {
          const groupData = await getGroupDetails(receiver.groupId);
          setGroupDetails(groupData);
        } else {
          setGroupDetails(null);
        }
        setMessageData(data);
      }
    })();
  }, [receiver]);

  if (!isChatSelected) {
    return (
      <div className="chatPanel">
        <div>selelct a chat to message</div>
      </div>
    );
  }
  console.log("groupDetails", groupDetails);
  return (
    <>
      <div className="chatPanel">
        <div className="chatPanel_nav">
          <div className="chatPanel_user">
            <span onClick={toggleProfile}>
              <Avatar />
            </span>
            <div className="ch_nav_details">
              <p className="ch_nav_name">
                {" "}
                {receiver.isGroup ? receiver.gname : receiver.name}{" "}
              </p>
              <p className="  "> online</p>
            </div>
          </div>
          {groupDetails && isAdmin && (
            <div className="className">
              <button
                data-tooltip-id="addPeople"
                data-tooltip-content="Add People To Group"
                className="AddPeopleToGroup"
                onClick={() => {
                  setShowAddPeople((prev) => !prev);
                }}
              >
                <AddIcon />
              </button>
              <Tooltip id="addPeople" />
            </div>
          )}
        </div>
        {showMessages && chatPanelChats(messageData, user)}
        {showProfile && chatPanelProfile()}
        {showMessages && (
          <div className="chatPanel_send">
            <SendText sendMessage={sendMessage} />
          </div>
        )}
        {showAddPeople && receiver.isGroup && (
          <AddPeopleModal
            setShowAddPeople={setShowAddPeople}
            showAddPeople={showAddPeople}
            groupId={receiver.groupId}
          />
        )}
      </div>
    </>
  );
}

function chatPanelChats(messagesData: any, user: any) {
  return (
    <div className="chatPanel_chat">
      <ScrollableFeed forceScroll={true}>
        {messagesData.map((item: any, idx: any) => {
          let isOther = true;
          if (item?.sender?._id === user._id) {
            isOther = false;
          } else if (item.other !== undefined) {
            console.log("itemsss", item);
            isOther = item.other;
          }
          return (
            <Messageitem
              message={item.content}
              other={isOther}
              time={item.date}
              image={item.image}
            />
          );
        })}
      </ScrollableFeed>
    </div>
  );
}

function chatPanelProfile() {
  return <div className="chatPanel_chat"></div>;
}

async function loadChats(recId: string, recName: string, isGroup: any) {
  const url = localUrl + "/chat/getMessages";
  const payload: any = {
    recId,
    recName,
  };
  if (isGroup === true) {
    payload.isGroup = true;
  }
  const headers = Header();
  const result = await axios.post(url, payload, headers);
  return result.data.data;
}

async function getGroupDetails(groupId: any) {
  const url = localUrl + "/group/getGroupDetails/" + groupId;
  const headers = Header();
  const result = await axios.get(url, headers);
  return result.data.data;
}
