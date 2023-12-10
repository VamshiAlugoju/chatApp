import React from "react";
import "./messageitem.css";
import { Avatar } from "@mui/material";

type messageItemProps = {
  message?: string;
  other?: boolean;
  time?: string;
  image?: string;
  Name?:string | undefined;
  type?:string 
  fileSrc?:string;
  profileSrc?:string;
};

export default function Messageitem(props: messageItemProps) {

  const [vidClicked , setVidClicked] = React.useState(false);
  function handleVidClick(){
    setVidClicked(true);
  }

  return (
    <>
      <div className={`message_item ${props.other ? "other" : "me"}` }>
        <div className={`message_content ${props.other ? "other" : "me"}`}>
          <div className="message_image_Avatar">
          <Avatar src={props.profileSrc} />
          </div>
         {props.type =="image"  && <div className="message_image">
           <img
               src={props?.image}
               alt="image"
               loading="lazy"
             />
          </div>
            }
         {  props.message && <div className="message_div">
            <div
              className={`message_item_Name ${props.other ? "other" : "me"}`}
            >
              <p>.{props.other ? props.Name: "You"}</p>
              <p className="message_time">{props.time}</p>
            </div>
            <div className={`message_value ${props.other ? "other" : "me"}`}>
              <div className={`message_text ${props.other ? "other" : "me"}`}>
                {props.message}
              </div>
            </div>
          </div>}
        
          {props.type === "video" &&    <div  className="wrapper">

              <video preload="none" controls={vidClicked ? true : false} onClick={handleVidClick} style={{cursor:"pointer"}} width={200} height={200} src={props.fileSrc}>
                controlls
              </video>
              <div className="content">
           { !vidClicked && <div onClick={handleVidClick} className="play">►</div>}
            
        </div>
            
            </div>}
        </div>
      </div>
    </>
  );
}


