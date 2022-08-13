import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { List } from './container/List';
import { Summary } from './container/Summary';
function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
           <List />
          </Route>
          <Route exact path="/summary/:id">
           <Summary />
          </Route>
      </Switch>
     </Router>
    </div>
  );
}

export default App;
