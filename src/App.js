import "./App.css";
import { useState, createContext, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ShowStory from "./ShowStory";
import FooterLayout from "./FooterLayout";
import Header from "./Header";
import DarkModeContext from './DarkModeContext'


function App() {
  const [darkMode, setDarkMode] =useState(true);

  return (
    <DarkModeContext.Provider value={{darkMode, setDarkMode}} >
      <div className="App" className={darkMode? "darkModeBackground" : ""} >
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
