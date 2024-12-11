import React from "react";
import CardWapper from "@/components/auth/CardWapper";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";




const ResetPassword = () => {
  return (
    <div>
      <CardWapper
        headerText="Reset"
        headerLabel="Reset your password?"
        footerActionLink="/login"
        footerActionText="Go back"
      >
        <ResetPasswordForm />
      </CardWapper>
    </div>
  );
};

export default ResetPassword;
