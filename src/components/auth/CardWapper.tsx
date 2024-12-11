import React from "react";
import Header from "./CardHeader";
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardWapperProps {
  headerText: string;
  headerLabel?: string;
  children: React.ReactNode;
  socialIcons?: boolean;
  footerActionText?: string;
  footerActionLink?: string;
}

const CardWapper = ({
  children,
  headerText,
  headerLabel,
  socialIcons = false,
  footerActionLink,
  footerActionText,
}: CardWapperProps) => {
  return (
    <div className="max-w-[400px] w-[400px]">
      <Card className="">
        <CardHeader>
          <Header headerText={headerText} headerLabel={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter >
          <Footer
            footerActionText={footerActionText}
            footerActionLink={footerActionLink}
            socialIcons={socialIcons}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWapper;
