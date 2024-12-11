import React from "react";
import Socialcons from "./Socialcons";
import Link from "next/link";

interface FooterProps {
  socialIcons?: boolean;
  footerActionText?: string;
  footerActionLink?: string;
}

const Footer = ({
  socialIcons = false,
  footerActionLink,
  footerActionText,
}: FooterProps) => {
  return (
    <div className="w-full">
      {socialIcons && <Socialcons />}

      <Link
        href={`${footerActionLink}`}
        className="text-xs text-black text-center block mt-4 hover:underline font-bold"
      >
        {footerActionText}
      </Link>
    </div>
  );
};

export default Footer;
