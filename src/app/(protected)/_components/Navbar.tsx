"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  const pathname = usePathname();
  console.log({ pathname });

  return (
    <div className="p-3 rounded-md bg-white flex items-center justify-between w-[600px]">
      <div className="flex items-center gap-1">
        <Button variant={pathname == "/server" ? "default" : "outline"}>
          <Link href="/server">Server</Link>
        </Button>
        <Button variant={pathname == "/client" ? "default" : "outline"}>
          <Link href="/client">Client</Link>
        </Button>
        <Button variant={pathname == "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button variant={pathname == "/setting" ? "default" : "outline"}>
          <Link href="/setting">Setting</Link>
        </Button>
      </div>

      <ProfileDropDown />
    </div>
  );
};

export default Navbar;
