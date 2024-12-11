"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login";
import FormErrorMessage from "./../FormErrorMessage";
import FormSuccessMessage from "./../FormSuccessMessage";
import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const LoginForm = () => {
  const params = useSearchParams();
  const redirectUrl = params.get("redirect") || "";
  
  const urlError =
    params.get("error") == "OAuthAccountNotLinked"
      ? "Email already used with different provider!"
      : "";

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isOTPShow, setIsOTPShow] = useState<boolean>(false);
  const [isPanding, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        if (data.error) {
          form.reset();
          setError(data.error);
        } else if (data.success) {
          form.reset();
          setSuccess(data.success);
          redirect(redirectUrl || DEFAULT_LOGIN_REDIRECT);
        } else if (data.isTwoFA) {
          setIsOTPShow(true);
        }
      });
    });
  };

  return (
    <Form {...form}>
      {isOTPShow && (
        <Button
          variant={"outline"}
          className="w-15 h-15 rounded-full mb-5"
          onClick={() => setIsOTPShow(false)}
        >
          <FaArrowLeftLong />
        </Button>
      )}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {!isOTPShow ? (
          <>
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
          </>
        ) : (
          <div>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="!p-4" />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Please enter the one-time password sent to your E-mail.
                    </FormDescription>
                  </FormItem>
                );
              }}
            />
          </div>
        )}

        {!isOTPShow && (
          <Button
            variant={"link"}
            type="button"
            className="text-xs font-medium px-0"
          >
            <Link href="/forget-password">Forget password?</Link>
          </Button>
        )}

        <FormErrorMessage message={error || urlError} />
        {success && <FormSuccessMessage message={success} />}
        <Button type="submit" className="w-full mt-4" disabled={isPanding}>
          {isOTPShow ? "Verify OTP" : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
