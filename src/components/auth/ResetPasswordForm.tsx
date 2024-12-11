"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { resetPassSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrorMessage from "./../FormErrorMessage";
import FormSuccessMessage from "./../FormSuccessMessage";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/resetPassword";

const ResetPasswordForm = () => {
  const params = useSearchParams()
  const token = params.get("token") || "";

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPanding, startTransition] = useTransition();
  const form = useForm<z.infer<typeof resetPassSchema>>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof resetPassSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      resetPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPanding}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormErrorMessage message={error} />
        {success && <FormSuccessMessage message={success} />}
        <Button type="submit" className="w-full mt-4" disabled={isPanding}>
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
