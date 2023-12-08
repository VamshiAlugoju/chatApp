import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chats";
import axios from "axios";
import { localUrl } from "./helper/Baseurls";
import Header from "./helper/constants";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let loggedin = false;
  const token = localStorage.getItem("token");
  if (token !== undefined && token !== null) {
    loggedin = true;
  }
  const [isLoggedIn, setisLoggedIn] = useState(loggedin);
  const [loading , setLoading] = useState(true);
  const [userdata,setUserdata] = useState(null);
  async function loginUser() {
    setisLoggedIn(true);
  }

  async function logOutUser() {
    localStorage.removeItem("token");
    setisLoggedIn(false);
  }

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        const url = localUrl + "/user/getUserDetails";
        const headers = Header();
        const result = await axios.get(url, headers);
        const data = result.data.data;
        dispatch({ type: "ADDUSER", payload: data });
        setLoading(false)
        setUserdata(data)
      }
    })();
  }, [isLoggedIn]);
  
  if(userdata !== null){
    return (
      <>
        {/* {isLoggedIn && loading  &&(
          <div>loading</div>
          ) }
        {isLoggedIn && !loading &&  <Chat logOutUser={logOutUser} />} */}
        {isLoggedIn  &&  <Chat logOutUser={logOutUser} />}
  
         {!isLoggedIn &&<Auth loginUser={loginUser} />}
        
      </>
    );
  }
  else {
   return (<>
   {!isLoggedIn && <Auth loginUser={loginUser} />}
   </>)
  }
}

export default App;
