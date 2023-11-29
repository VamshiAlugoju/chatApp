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
  const [isLoggedIn, setisLoggedIn] = useState(false);
  async function loginUser() {
    setisLoggedIn(true);
    const url = localUrl + "/user/getUserDetails";
    const headers = Header();
    const result = await axios.get(url, headers);
    const data = result.data.data;
    dispatch({ type: "ADDUSER", payload: data });
  }
  // function logoutUser() {
  //   setisLoggedIn(false);
  // }

  return <>{isLoggedIn ? <Chat /> : <Auth loginUser={loginUser} />}</>;
}

export default App;
