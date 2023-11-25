import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chats";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  function loginUser() {
    setisLoggedIn(true);
  }
  // function logoutUser() {
  //   setisLoggedIn(false);
  // }

  return <>{isLoggedIn ? <Chat /> : <Auth loginUser={loginUser} />}</>;
}

export default App;
