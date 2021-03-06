import React, { useContext} from "react";
import DarkModeContext from "./DarkModeContext";

const Header = () => {
  const { darkMode } = useContext(DarkModeContext)
  return (
    <div className="title" >
      <text>Welcome to HackerNews</text>
    </div>
  );
};

export default Header;