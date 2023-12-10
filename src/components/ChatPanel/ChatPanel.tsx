import React, {  useDebugValue, useEffect } from "react";
import "./chatpanel.css";
import { Avatar, Button } from "@mui/material";
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
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import AddPeopleModal from "../models/AddPeopleModal";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
type ChatPanelProps = {
  chatId?: string;
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  if(name){
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return {}
}



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
      messageData.type = result.data?.data?.type;
      messageData.fileSrc = result?.data?.data?.fileSrc;
    }
    console.log(result.data?.data?.sender?.imgSrc , "summa");
    messageData.sender = {}
    messageData.sender.imgSrc = result.data?.data?.sender?.imgSrc;
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
             { receiver?.isGroup ? <Avatar {...stringAvatar(receiver.gname)} /> : <Avatar src={receiver?.imgSrc} />}
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
        {showProfile && <ChatPanelProfile receiver={receiver} id={receiver._id} isGroup={receiver.isGroup} />}
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
              profileSrc={item?.sender?.imgSrc}
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
  const [groupData,setGroupData] = React.useState<any>(null)
  
  const centerStyle = {
    display:"flex",
    justifyContent:"center"
  }


  async function removeUserFromGroup(id,groupId){
    try{
      setLoading(true);
      let url = localUrl+"/group/removeUsers";
      const headers = Header();
      const result = await axios.post(url,{_id:id,groupId:groupId},headers);
      const data = await getGroupDetails(props.receiver?.groupId);
      setGroupData(data);
      setLoading(false);
    }
    catch(err){
      setLoading(false);
    }
  }

  async function makeUserAdmin(id,groupId){
    try{
      setLoading(true);
      let url = localUrl+"/group/addAdmin";
      const headers = Header();
      const result = await axios.post(url,{_id:id,groupId:groupId},headers);
      const data = await getGroupDetails(props.receiver?.groupId);
      setGroupData(data);
      setLoading(false);
    }
    catch(err){
      setLoading(false);
    }
  }
     useEffect(()=>{
        (async()=>{

          try{
            let url = localUrl+"/user/getUserDetails/"+props.id;
            const headers = Header();
            let result;
             if(props?.receiver?.isGroup){ 
              result = await getGroupDetails(props.receiver?.groupId);
              setGroupData(result)
              setLoading(false);
             }
             else{
               result = await axios.get(url,headers);
               setUserData(result.data.data);
               setLoading(false);
             }
          }
          catch(err){
            setLoading(false);
          }
        })()

     },[])

     useEffect(()=>{
     
      console.log("group data" , groupData)

     ,[groupData]})
      
  return <div  className="chatPanel_chat">
    {loading ? <div style={{...centerStyle,height:"100%" ,alignItems:"center"}}>
<ClipLoader />
    </div> : <>
    <div style={{textAlign:"center"}}>
      <h1>userDetails</h1>
    </div>
    <div className="chatPanelPeople_image_div" style={centerStyle}>
    { props.receiver.isGroup ? <img src="https://picsum.photos/300?grayscale"/> :   <img src={userData?.imgSrc} alt="" />}
    </div>
    
  { props?.receiver?.isGroup ?  <div style={{...centerStyle,flexDirection:"column",alignItems:"flex-start" }}>
     <h2 style={{marginLeft:"1rem"}}>Group Name : <span>{groupData?.Name}</span></h2>
      <h2 style={{marginLeft:"1rem"}}>About : <span>{groupData?.About}</span></h2>
      <div className="group_memebers_div">
      <h2 style={{marginLeft:"1rem"}}>Members : </h2>
       <div style={{marginLeft:"1rem"}}>
        {groupData?.members?.map(item=>{
          return <GroupItem makeUserAdmin={makeUserAdmin} removeUserFromGroup={removeUserFromGroup} user={item} groupData={groupData} />
        })}
       </div>
      </div>
     </div> : <div style={{...centerStyle,flexDirection:"column",alignItems:"flex-start" }}>
       <h2 style={{marginLeft:"1rem"}}>Name : <span>{userData?.name}</span></h2>
      <h2 style={{marginLeft:"1rem"}}>Email : <span>{userData?.email}</span></h2>
      <h2 style={{marginLeft:"1rem"}}>About : <span>{userData?.bio}</span></h2>
    </div>}
    </> }
 
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
 
function GroupItem(props):JSX.Element{
    const user = props.user;
    const groupData = props.groupData;
    function deleteUser(){
      props.removeUserFromGroup(user._id , groupData._id)
    }
    function makeAdmin(){
      props.makeUserAdmin(user._id,groupData._id)
    }
    const isAdmin = groupData.Admins.find((useritem:any)=>user._id === useritem._id);

  return (
    <>
      <div className="GroupItem">
        <Avatar />
        <h2 
         data-tooltip-content={user?.name}
         data-tooltip-id="groupItem_userName"
        >{user?.name.slice(0,10)}</h2>
       {isAdmin ? <Button
        data-tooltip-content={`Admin`}
        data-tooltip-id="groupItem_admin"
        >
          <AdminPanelSettings color="success" />
        </Button>
        :
        <Button
        data-tooltip-content={`Make ${user?.name} Admin`}
        data-tooltip-id="groupItem_admin"
        onClick={makeAdmin}
        >
          <AdminPanelSettings />
        </Button>}
        <Button
         data-tooltip-content={`Remove ${user?.name} from group`}
         data-tooltip-id="groupItem_remove"
         onClick={deleteUser}
        >
          <DeleteIcon color="error" />
        </Button>
      </div>
      <Tooltip id={"groupItem_userName"} />
      <Tooltip id={"groupItem_admin"} />
      <Tooltip id={"groupItem_remove"} />
    </>
  )
}