import React, { useContext } from "react";
import DarkModeContext from "./DarkModeContext";

const ToggleButton = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  return (
    //if we're in dark mode, give the option for light mode
    <button
      onClick={() =>
        setDarkMode((prevValue) => {
          return !prevValue;
        })
      }
    >
      {!!darkMode ? "Light mode" : "Dark mode"}{" "}
    </button>
  );
};

export default ToggleButton;