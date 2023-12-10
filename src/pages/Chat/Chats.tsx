import styles from "./chats.module.css";
import React , {useEffect} from "react";
import "./chats.css";
import ChatList from "../../components/ChatsList/ChatList";
import ChatPanel from "../../components/ChatPanel/ChatPanel";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Tooltip } from "react-tooltip";
import { Modal } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { localUrl } from "../../helper/Baseurls";
import Header from "../../helper/constants";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

type ChatProps = {
  logOutUser: () => void;
};
export default function Chat(props: ChatProps) {

  const [showUserDetails , setShowUserDetails] = React.useState(false);
  return (
    <>
      <div className="homePage">
        <div className="chat_app">
          <div className="nav_div">
            <div className="Nav_icon">
              {" "}
              <svg
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 612 612"
              >
                <g>
                  <g id="_x32__26_">
                    <g>
                      <path d="M401.625,325.125h-191.25c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h191.25                                     c10.557,0,19.125-8.568,19.125-19.125S412.182,325.125,401.625,325.125z M439.875,210.375h-267.75                                     c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h267.75c10.557,0,19.125-8.568,19.125-19.125                                     S450.432,210.375,439.875,210.375z M306,0C137.012,0,0,119.875,0,267.75c0,84.514,44.848,159.751,114.75,208.826V612                                     l134.047-81.339c18.552,3.061,37.638,4.839,57.203,4.839c169.008,0,306-119.875,306-267.75C612,119.875,475.008,0,306,0z                                     M306,497.25c-22.338,0-43.911-2.601-64.643-7.019l-90.041,54.123l1.205-88.701C83.5,414.133,38.25,345.513,38.25,267.75                                     c0-126.741,119.875-229.5,267.75-229.5c147.875,0,267.75,102.759,267.75,229.5S453.875,497.25,306,497.25z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div
             className="left_nav_icons"
             style={{ textAlign: "center", marginTop: "1rem" }}
            >
              <AccountCircleIcon onClick={()=>{
                setShowUserDetails(true)
              }}  data-tooltip-id="user_toolTip"
                  data-tooltip-content="About" sx={{ color: "#e91e63", fontSize: 40 }} />
              <Tooltip id="user_toolTip" />
            </div>
            <div
              className="logOut_div left_nav_icons"
              style={{ textAlign: "center", marginTop: "1rem" }}
              onClick={props.logOutUser}
            >
              <span>
                <ExitToAppIcon
                  data-tooltip-id="logout_tooltip"
                  data-tooltip-content="Logout"
                  sx={{ color: "#e91e63", fontSize: 40 }}
                />
              </span>
              <Tooltip id="logout_tooltip" />
            </div>
           
          </div>
          <div className="chatList_main">
            <ChatList />
          </div>
          <div className="main_chat_panel">
            <ChatPanel />
          </div>
        </div>
       { showUserDetails && <UserDetails showModal={showUserDetails} setShowModal = {setShowUserDetails} />}
      </div>
    </>
  );
}
const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  backgroundColor: "white",
  boxShadow: "24",
  borderRadius:"5px",
  pt: 2,
  px: 4,
  pb: 3,
};
function UserDetails(props):JSX.Element{
   
  console.log("called")
  const [userData,setUserData] = React.useState<any>(null);
  const [loading,setLoading] = React.useState(true);
  const centerStyle = {
    display:"flex",
    justifyContent:"center"
  }
     useEffect(()=>{
      const  url = localUrl+"/user/getUserDetails/";
      const headers = Header();
      axios.get(url,headers).then((result)=>{
          setUserData(result.data.data);
          setLoading(false);
      }).catch(err=>{
        console.log(err.message);
        setLoading(false);
      })
     },[])
      
  return(
    <>
    <Modal open={props.showModal} onClose={()=>{
      props.setShowModal(false)
    }} >
        <div style={style}>
        <h1 style={{textAlign:"center",borderBottom:"1px solid black", paddingBottom:"0.5rem"}}>
          About
        </h1>
      {loading ? <div style={{display:"flex" , justifyContent:"center", paddingBottom:"1rem"}}>

        <ClipLoader />
      </div>
       : 
        <div>
        <div className="chatPanelPeople_image_div" style={centerStyle}>
      <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    </div>
    <div style={{...centerStyle,flexDirection:"column",alignItems:"flex-start" }}>
       <h2 style={{marginLeft:"1rem"}}>Name : <span className="userDetails_values"> {userData?.name}</span></h2>
      <h2 style={{marginLeft:"1rem"}}>Email : <span className="userDetails_values">{userData?.email}</span></h2>
      <h2 style={{marginLeft:"1rem"}}>About : <span className="userDetails_values">{userData?.bio}</span></h2>
    </div>
        </div>}
      </div>
     
    </Modal>
    </>
  )
}