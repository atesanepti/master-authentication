"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serverAction } from "@/actions/admin";
import { toast } from "sonner";

const Admin = () => {
  const handleServerAction = async () => {
    const response = await serverAction();
    if (response.error) {
      toast.error("Request Error", {
        description: response.error,
        action: false,
      });
    } else if (response.success) {
      toast.success("Request Fullfiled", {
        description: response.success,
        action: false,
      });
    }
  };

  const handleApiRoute = async () => {
    try {
      const response = await fetch("/api/admin");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      if (data.success) {
        toast.success("Request Fullfiled", {
          description: data.success,
          action: false,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Request Error", {
        description: error.message,
        action: false,
      });
    }
  };

  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <h4 className="text-center text-xl font-semibold">Admin</h4>
        </CardHeader>

        <CardContent className="flex flex-col gap-1">
          <div className="shadow-md py-2 px-3 rounded-sm flex justify-between items-center">
            <span className="text-sm font-medium ">Test Server Action </span>
            <Button variant={"default"} onClick={handleServerAction}>
              Test
            </Button>
          </div>
          <div className="shadow-md py-2 px-3 rounded-sm flex justify-between items-center">
            <span className="text-sm font-medium ">Test Api Route</span>
            <Button variant={"default"} onClick={handleApiRoute}>
              Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
