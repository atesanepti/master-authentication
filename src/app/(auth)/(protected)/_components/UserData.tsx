"use client";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserRole } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const UserData = () => {
  const user = useCurrentUser();
  const role = useCurrentRole();
  console.log("user ", user);
  return (
    <Card>
      <CardHeader>
        <h4 className="text-xl text-center font-semibold ">User Data</h4>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1 ">
          <div className="rounded-md shadow-md flex justify-between items-center p-3">
            <span className="text-sm text-black font-medium">Name</span>
            <span className="text-sm text-black truncate font-mono font-medium">
              {user?.name}
            </span>
          </div>
          <div className="rounded-md shadow-md flex justify-between items-center p-3">
            <span className="text-sm text-black font-medium">E-mail</span>
            <span className="text-sm text-black truncate font-mono font-medium">
              {user?.email}
            </span>
          </div>

          <div className="rounded-md shadow-md flex justify-between items-center p-3">
            <span className="text-sm text-black font-medium">User Role</span>
            <span className="text-sm text-black truncate font-mono font-medium">
              {role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER}
            </span>
          </div>

          <div className="rounded-md shadow-md flex justify-between items-center p-3">
            <span className="text-sm text-black font-medium">
              Two Factor Verification
            </span>
            <Badge variant={user.twoFA ? "success" : "destructive"}>
              {user?.twoFA ? "ON" : "OFF"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserData;
