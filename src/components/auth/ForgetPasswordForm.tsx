"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { forgetPassSchema } from "@/schema";
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
import { forgetPassword } from "@/actions/forgetPassword";

const ForgetPasswordForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPanding, startTransition] = useTransition();
  const form = useForm<z.infer<typeof forgetPassSchema>>({
    resolver: zodResolver(forgetPassSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof forgetPassSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      forgetPassword(values).then((data) => {
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
          name="email"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPanding}
                    placeholder="jhondoe@email.com"
                    type="email"
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
          Forget Password
        </Button>
      </form>
    </Form>
  );
};

export default ForgetPasswordForm;
