import React from "react";
import SignIn from "./Signin";
import SignUp from "./Signup";

type authProps = {
  loginUser: () => void;
};
export default function Auth(props: authProps) {
  const [loginMode, setloginMode] = React.useState(true);
  function toggleToLogin() {
    setloginMode(true);
  }
  function toggleToSignUp() {
    setloginMode(false);
  }
  return loginMode ? (
    <SignIn loginUser={props.loginUser} toggleToSignUp={toggleToSignUp} />
  ) : (
    <SignUp toggleToLogin={toggleToLogin} />
  );
}
