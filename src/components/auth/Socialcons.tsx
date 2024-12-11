"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Socialcons = () => {
  const handleSignin = async (provider: "github" | "google") => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex justify-between items-center gap-2 ">
      <Button
        variant={"outline"}
        className="flex-1"
        onClick={() => handleSignin("google")}
      >
        <FaGoogle /> Google
      </Button>
      <Button
        variant={"outline"}
        className="flex-1"
        onClick={() => handleSignin("github")}
      >
        <FaGithub /> Github
      </Button>
    </div>
  );
};

export default Socialcons;
