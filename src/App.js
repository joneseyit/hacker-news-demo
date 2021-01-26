import "./App.css";
import {Switch, Route} from 'react-router-dom';
import HomePage from "./HomePage";
import ShowStory from './ShowStory';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/:storyId' >
          <ShowStory />
        </Route>
        <Route path='/' >
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
