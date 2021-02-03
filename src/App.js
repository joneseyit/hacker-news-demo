import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ShowStory from "./ShowStory";
import FooterLayout from "./FooterLayout";
import Header from "./Header";

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
