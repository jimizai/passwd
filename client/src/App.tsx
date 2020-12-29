import React from 'react';
import { Switch, Route, HashRouter as Router, Redirect } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

function App() {
  return (
    <Router>
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
      />
      <Route path="/login" component={Login} />
      {/* <Route path="/404" component={NotFound} />
      <Route path="*" component={NotFound} /> */}
    </Switch>
  </Router>
  );
}

export default App;
