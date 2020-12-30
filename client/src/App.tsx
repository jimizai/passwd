import React, { useEffect, useCallback } from 'react';
import { Switch, Route, HashRouter as Router, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Pages from './Pages';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
// import { State } from './store';

function App() {
  // const { token } = useSelector<State, State>(state => state);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Pages} />
        <Route path='/login' component={Login} />
        <Route path='/404' component={NotFound} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
