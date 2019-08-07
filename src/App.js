import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './components/_pages/Home'
import Redirect from './components/_pages/URL-Mini/Redirect'

const App = () => {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Home />
        )} />
        <Route path='/:id' render={(props) => (
          <Redirect id={props.match.params.id} />
        )} />
      </Switch>
    );
}
export default App;