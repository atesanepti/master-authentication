"use client";
import React, {  useEffect, useState, useTransition } from "react";
import CardWapper from "./../../components/auth/CardWapper";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import SyncLoader from "react-spinners/esm/SyncLoader";
import { verifyToken } from "@/actions/token";
import FormErrorMessage from "./../../components/FormErrorMessage";
import FormSuccessMessage from "./../../components/FormSuccessMessage";


const Verification = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isVerifing, startVerifing] = useTransition();
  const params = useSearchParams();
  const token = params.get("token");

  const getVerify = (token: string | null | undefined) => {
    setError("");
    setSuccess("");
    startVerifing(async () => {
      const response = await verifyToken(token);
      setError(response?.error);
      setSuccess(response?.success);
    });
  };

  useEffect(()=>{
    if(!token){
      setError("Invalid Verification Link")
    }
  },[token])

  return (
    <div
     
    >
      <CardWapper
        headerText="Verify"
        headerLabel="Verify your email"
        footerActionLink="/login"
        footerActionText="Go back"
      >
        <div className="flex justify-center flex-col">
          <FormErrorMessage message={error} />
          <FormSuccessMessage message={success} />

          {!isVerifing && !error && !success && (
            <Button
              className="mt-4 w-max mx-auto"
              variant={"default"}
              onClick={() => getVerify(token)}
            >
              Verify
            </Button>
          )}

          {isVerifing && <SyncLoader size={10} className="mx-auto" />}
        </div>
      </CardWapper>
    </div>
  );
};

export default Verification;
