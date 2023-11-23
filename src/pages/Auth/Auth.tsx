import React from "react";
import SignIn from "./Signin";
import SignUp from "./Signup";
export default function Auth() {
  const [loginMode, setloginMode] = React.useState(true);
  function toggleToLogin() {
    setloginMode(true);
  }
  function toggleToSignUp() {
    setloginMode(false);
  }
  return loginMode ? (
    <SignIn toggleToSignUp={toggleToSignUp} />
  ) : (
    <SignUp toggleToLogin={toggleToLogin} />
  );
}
