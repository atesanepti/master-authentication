import React from "react";
import CardWapper from "./../../../components/auth/CardWapper";
import ForgetPasswordForm from './../../../components/auth/ForgetPasswordForm';

const ForgetPassword = () => {
  return (
    <div>
      <CardWapper
        headerText="Forget"
        headerLabel="Forget your password?"
        footerActionLink="/login"
        footerActionText="Go back"
      >
        <ForgetPasswordForm />
      </CardWapper>
    </div>
  );
};

export default ForgetPassword;
