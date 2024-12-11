
import React from "react";
import CardWapper from "./../../../components/auth/CardWapper";
import LoginForm from "./../../../components/auth/LoginForm";



const Login = () => {
  
 
  return (
    <div
   
    >
      <CardWapper
        headerText="Login"
        headerLabel="Welcome back"
        socialIcons
        footerActionText="Don't have an account?"
        footerActionLink="/signup"
      >
        <LoginForm />
      </CardWapper>
    </div>
  );
};

export default Login;
