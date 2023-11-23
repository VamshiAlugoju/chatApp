import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chats";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(true);
  console.log(setisLoggedIn);
  function fakeLogin() {
    setisLoggedIn(true);
  }
  return (
    <>
      {!isLoggedIn && <button onClick={fakeLogin}>click to login</button>}
      {isLoggedIn ? <Chat /> : <Auth />}
    </>
  );
}

export default App;
