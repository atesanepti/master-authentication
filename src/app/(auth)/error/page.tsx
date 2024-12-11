
import React from 'react'
import CardWapper from './../../../components/auth/CardWapper';
import { MdOutlineReportGmailerrorred } from "react-icons/md";


const Error = () => {
  return (
    <div
    
    >
      <div className="w-[320px] md:w-[400px] ">
        <CardWapper
          headerText="Auth Failed!"
          headerLabel="Opps! someting went error"
          footerActionText="Go back"
          footerActionLink="/login"
        >
          <div className="flex justify-center">
            <MdOutlineReportGmailerrorred className="text-destructive w-14 h-14" />
          </div>
        </CardWapper>
      </div>
    </div>
  );
}

export default Error