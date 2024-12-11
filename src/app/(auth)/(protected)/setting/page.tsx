"use client";
import React, { useState, useTransition } from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormMessage,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideMessageSquareWarning } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { settingSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/FormErrorMessage";
import FormSuccessMessage from "@/components/FormSuccessMessage";
import { setting } from "@/actions/setting";

const Setting = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { update } = useSession();

  const user = useCurrentUser();
  const form = useForm<z.infer<typeof settingSchema>>({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      newPassword: "",
      oldPassword: "",
      role: user?.role || "",
      isTwoFA: user?.twoFA,
    },
  });

  const isOAuthProvider = user?.isOAuth;

  const handleSubmit = (values: z.infer<typeof settingSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      setting(values).then(async (data) => {
        if (data.success) {
          setSuccess(data.success);
          await update();
        } else if (data.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <div className="mt-5">
      <Card className="max-h-[500px] overflow-auto ">
        <CardHeader>
          <h4 className="text-xl font-semibold text-center">Setting</h4>
          {isOAuthProvider && (
            <Alert className="max-w-[530px]">
              <LucideMessageSquareWarning className="h-4 w-4" />
              <AlertTitle>OAuth Provider</AlertTitle>
              <AlertDescription>
                You cannot update your profile caurse you are on Google or
                Github provider
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        disabled={isPending || isOAuthProvider}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending || isOAuthProvider}
                        type="email"
                        placeholder="Enter Your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="mb-2 flex-1">
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending || isOAuthProvider}
                          type="password"
                          placeholder="******"
                          disabled={isOAuthProvider}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="mb-2 flex-1">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending || isOAuthProvider}
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="mb-2 ">
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending || isOAuthProvider}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>ADMIN</SelectItem>
                        <SelectItem value={UserRole.USER}>USER</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="isTwoFA"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full  flex items-center justify-between p-2  flex-row border rounded-sm">
                    <div>
                      <FormLabel>Two Factor Authtication</FormLabel>
                      <FormDescription>
                        Enable Two Factor Authentication for Extra Securty
                      </FormDescription>
                    </div>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending || isOAuthProvider}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <FormErrorMessage message={error} />
              <FormSuccessMessage message={success} />

              <Button
                type="submit"
                variant={"default"}
                disabled={isPending || isOAuthProvider}
                className="mt-4"
              >
                {" "}
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setting;
