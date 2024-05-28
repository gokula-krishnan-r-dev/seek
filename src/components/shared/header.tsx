import React from "react";
import DarkModeToggle from "./dark-mode-toggle";

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-darkBlue h-20 shadow-md">
      <div className="container mx-auto flex py-5 px-6 items-center justify-between">
        <h1 className="text-2xl font-extrabold dark:text-white">
          Where in the world?
        </h1>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
