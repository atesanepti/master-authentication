import React from "react";

interface CardHeaderProps {
  headerText: string;
  headerLabel?: string;
}

const Header = ({ headerText, headerLabel }: CardHeaderProps) => {
  return (
    <div className="text-center">
      <h3 className="text-3xl text-black font-bold ">{headerText}</h3>
      <span className="text-base text-muted-foreground">{headerLabel}</span>
    </div>
  );
};

export default Header;
