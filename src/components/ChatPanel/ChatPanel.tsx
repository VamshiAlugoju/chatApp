import React, {  useDebugValue, useEffect } from "react";
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
import io from "socket.io-client";
import BeatLoder from "react-spinners/BeatLoader"
import ClipLoader from "react-spinners/ClipLoader"

import AddPeopleModal from "../models/AddPeopleModal";
type ChatPanelProps = {
  chatId?: string;
};

let socket ;
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
  const [showUpload , setShowUpload] = React.useState(false);
  const [uploadingFile , setUploadingFile] = React.useState(false);
  function toggleProfile() {
    setshowProfile((prev) => !prev);
    setShowMessages((prev) => !prev);
  }
  function toggleUpload(){
    setShowUpload(prev=>!prev);
  }
  async function sendMessage(message, filesArr) {
    
    const formData = new FormData();
    const messageData : any = {
      other: false,
      date: Date.now().toLocaleString(),
    };
    if(!message && filesArr){
      formData.append('file', filesArr[0]?.file);
    }
    const payload = {
      message: message,
      time: Date.now().toLocaleString(),
      rec: receiver,
    };
    
    formData.append("time", payload.time);
    formData.append("rec", JSON.stringify( payload.rec));
if (message) {
  formData.append("message", payload.message);
  messageData.content = message;
}
  
    const url = localUrl + "/chat/sendMessage";
    const headers = Header();
    let result = await axios.post(url, formData, headers);
    if(filesArr && filesArr.length!== 0 && message === null){
         console.log(result , "summa");
         messageData.type = result.data?.data?.type;
         messageData.fileSrc = result?.data?.data?.fileSrc;
    }
    setMessageData((prev) => {
      return [...prev, messageData];
    });
    socket.emit("send message",{...messageData,other:true ,id:receiver._id});
  }

  async function uploadFiles(arrOfFiles){
       setUploadingFile(true);
       console.log(arrOfFiles , "files");
      await sendMessage( null , arrOfFiles);
       setUploadingFile(false)
  }

  useEffect(() => {
    (async () => {

      if (Object.keys(receiver).length !== 0) {
        setshowProfile(false) 
        setShowMessages(true);
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
        socket.emit("join room",receiver._id);
        setMessageData(data);

      }
    })();
  }, [receiver]);
   useEffect(()=>{
    console.log( ",,,,,,,,,,,....>>>.", messageData)
   },[messageData])
  useEffect(()=>{
    socket = io.connect("http://localhost:8080");
    socket.emit("setup",user)
    socket.on("connected",()=>{
        console.log("connected");
    })
    socket.on("recieve message",(data)=>{
          console.log("recived messaage" , data)
          setMessageData((prev) => {
            return [...prev, data];
          });
    })

},[])


  if (!isChatSelected) {
    return (
      <div className="chatPanel">
        <div style={{display:"flex" , justifyContent:"center", alignItems:"center", height:"100%" ,flexDirection:"column"}}>
          <h1>Select A Chat To Message</h1>
          <h1> Or Click On Add Chat</h1>
        </div>
      </div>
    );
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
              <p className="ch_nav_name">
                {" "}
                {receiver.isGroup ? receiver.gname : receiver.name}{" "}
              </p>
              <p className="  ">Not Online</p>
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
        {showProfile && <ChatPanelProfile id={receiver._id} isGroup={receiver.isGroup} />}
        {showMessages && (
          <div className="chatPanel_send">
            {uploadingFile ? <div style={{width:"100%" , display:"flex", justifyContent:"center"}}><BeatLoder loading={uploadingFile} color="#36d7b7" /></div> : <SendText uploadFiles={uploadFiles} toggleUpload={toggleUpload} sendMessage={sendMessage} />}
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
      <div style={{height:"100%"}}>

      <ScrollableFeed forceScroll={true}  >
        {messagesData.map((item: any, idx: any) => {
          let isOther = true;
          if (item?.sender?._id === user._id) {
            isOther = false;
          } else if (item.other !== undefined) {
            isOther = item.other;
          }
          return (
            <Messageitem
              type={item.type}
              message={item.content}
              other={isOther}
              time={item.date}
              image={item?.fileSrc}
              Name={item?.sender?.name}
              fileSrc={item?.fileSrc}
            />
          );
        })}
      </ScrollableFeed>
      </div>
    </div>
  );
}

function ChatPanelProfile(props) : Jsx.Element {
  const [userData,setUserData] = React.useState<any>(null);
  const [loading,setLoading] = React.useState(true);
  const centerStyle = {
    display:"flex",
    justifyContent:"center"
  }
     useEffect(()=>{
      let url = localUrl+"/user/getUserDetails/"+props.id;
      const headers = Header();
      axios.get(url,headers).then((result)=>{
          setUserData(result.data.data);
          setLoading(false);
      }).catch(err=>{
        console.log(err.message);
        setLoading(false);
      })
     },[])
      
  return <div  className="chatPanel_chat">
    {loading ? <div>
<ClipLoader />
    </div> : <></> }
    <div style={{textAlign:"center"}}>
      <h1>userDetails</h1>
    </div>
    <div className="chatPanelPeople_image_div" style={centerStyle}>
      <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    </div>
    <div style={{...centerStyle,flexDirection:"column",alignItems:"flex-start" }}>
       <h2 style={{marginLeft:"1rem"}}>Name : <span>{userData?.name}</span></h2>
      <h2 style={{marginLeft:"1rem"}}>Email : <span>{userData?.email}</span></h2>
      <h2 style={{marginLeft:"1rem"}}>About : <span>{userData?.bio}</span></h2>
    </div>
  </div>;
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
