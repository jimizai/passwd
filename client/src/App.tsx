import React from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import Toast from './components/Toast/Toast';
import Pages from './Pages';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <div>
      <Toast />
      <Router>
        <Switch>
          <Route exact path='/' component={Pages} />
          <Route path='/login' component={Login} />
          <Route path='/404' component={NotFound} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
