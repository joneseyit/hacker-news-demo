import "./App.css";
import { useState, createContext, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ShowStory from "./ShowStory";
import FooterLayout from "./FooterLayout";
import Header from "./Header";
import DarkModeContext from './DarkModeContext';
import { darkTheme, lightTheme } from './Theme';
import ToggleButton from './toggleButton'
// import { Globa lStyles } from "./GlobalStyles";

function App() {
  const [darkMode, setDarkMode]=useState(false);

  return (
    <DarkModeContext.Provider value={{darkMode, setDarkMode}}  >
    
      <div className={!!darkMode? "darkModeBackground" : "lightModeBackground" }  >
        <ToggleButton/>
        <Header />
        <Switch>
          <Route path="/:storyId">
            <ShowStory />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <FooterLayout />
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
