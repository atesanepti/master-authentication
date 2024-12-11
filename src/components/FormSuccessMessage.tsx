import React from "react";
import { IoCheckmarkDone } from "react-icons/io5";

interface FormMessageProps {
  message?: string;
}

const FormSuccessMessage = ({ message }: FormMessageProps) => {
  if (!message) return null;

  return (
    <div className="py-3 px-4 rounded-md bg-emerald-500/15 flex items-center gap-2 mt-4">
      <IoCheckmarkDone className="text-emerald-500" />
      <span className="text-sm text-emerald-500">{message}</span>
    </div>
  );
};

export default FormSuccessMessage;
