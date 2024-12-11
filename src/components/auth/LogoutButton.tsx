"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return <span className="cursor-pointer" onClick={handleLogout}>Signout</span>;
};

export default LogoutButton;
