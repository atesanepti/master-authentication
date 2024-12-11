import React from "react";
import CardWapper from "@/components/auth/CardWapper";
import RegisterForm from "@/components/auth/RegisterForm";

const Signup = () => {
  return (
    <div >
      <CardWapper
        headerText="Register"
        headerLabel="Welcome"
        socialIcons
        footerActionLink="/login"
        footerActionText="Do you have an account?"
      >
        <RegisterForm />
      </CardWapper>
    </div>
  );
};

export default Signup;
