/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import ChatItem from "../chatItem/ChatItem";
import "./chatlist.css";
import { ReactElement } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AllUsersModal from "../models/AllUsersModal";
import CreateGroupModal from "../models/CreateGroupModal";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

export default function ChatList() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const arr = user?.chatList?.map((item) => {
    let data;
    if (item.users && item.users.length !== 0) {
      data = item.users.find((it) => {
        return it.name !== user.name;
      });
    }else {
      data = item
    }
    return data;
  });
  
  const [chats, setchats] = React.useState(arr);
  const [showSendOptions, setSendOptions] = React.useState(false);

  useEffect(() => {

    const updatedChatsData = user?.chatList?.map((item) => {
      let data;
      if (item.isGroup) {
        data = item;
      } else {
        if (item.users && item.users.length !== 0) {
          data = item.users.find((it) => {
            return it.name !== user.name;
          });
        }
      }
      return data;
    });
    setchats(updatedChatsData);
  }, [user.chatList]);

  // useEffect(()=>{
  //   socket = io("http://localhost:8080",{
  //     reconnection: true,           // Enable reconnection
  //     reconnectionAttempts: 3, 
  //   });
  //   return () => {
  //     // Clean up the socket connection when the component is unmounted
  //     socket.disconnect();
  //   };
  // },[])

  function selectUser(userId) {
    const chat = chats.find((chat) => {
      if (chat.isGroup) {
        return chat._id === userId;
      }
      return chat._id === userId;
    });
  
    dispatch({ type: "UPDATERECIEVER", payload: chat });
  }

  console.log(chats , "chats")
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
          {chats?.map((item) => {
  
            if (item.isGroup) {
              return (
                <ChatItem
                  id={item._id}
                  Name={item.gname}
                  LastMsg={item.Lastmessage}
                  src={item.src}
                  onClick={selectUser}
                />
              );
            }

            return (
              <ChatItem
                id={item._id}
                Name={item.name}
                LastMsg={item.Lastmessage}
                src={item.src}
                onClick={selectUser}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function OptionsPanel(props: any): ReactElement {
  const [allUserModal, setAllUserModal] = React.useState(false);
  const [showCreateGroup, setShowCreateGroup] = React.useState(false);
  function toggleCreateGroup() {
    setShowCreateGroup((prev) => !prev);
  }
  function toggleAllUser() {
    setAllUserModal((prev) => !prev);
  }
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
            <li onClick={toggleCreateGroup}>Create Group</li>
            <li onClick={toggleAllUser}>Search People</li>
          </ul>
        </div>
        {allUserModal && (
          <AllUsersModal
            toggleAlluser={toggleAllUser}
            allUserModal={allUserModal}
          />
        )}
        {showCreateGroup && (
          <CreateGroupModal
            showCreateGroup={showCreateGroup}
            toggleCreateGroup={toggleCreateGroup}
          />
        )}
      </div>
    </>
  );
}
