"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schema";
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
import FormErrorMessage from "../FormErrorMessage";
import FormSuccessMessage from "../FormSuccessMessage";
import { register } from "./../../actions/register";


const RegisterForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPanding, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof registerSchema>) => {
    setSuccess("");
    setError("");
    startTransition(() => {
      register(values).then(async (data) => {
        if (data && !data.error) {
          setSuccess(data.success)
        } else if (data.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPanding}
                    placeholder="Jone Deo"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
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
        {error && <FormErrorMessage message={error} />}
        {success && <FormSuccessMessage message={success} />}
        <Button type="submit" className="w-full mt-4" disabled={isPanding}>
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
