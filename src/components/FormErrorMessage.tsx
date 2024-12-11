import React from "react";
import { MdErrorOutline } from "react-icons/md";

interface FormMessageProps {
  message?: string;
}

const FormErrorMessage = ({ message }: FormMessageProps) => {
  if (!message) return null;

  return (
    <div className="py-3 px-4 rounded-md bg-destructive/15 flex items-center gap-2 mt-4 ">
      <MdErrorOutline className="text-destructive" />
      <span className="text-sm text-destructive line-clamp-1">{message}</span>
    </div>
  );
};

export default FormErrorMessage;
