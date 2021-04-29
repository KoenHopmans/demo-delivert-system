import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Demos from './Demos';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';
import LogOut from './LogOut';
import Profile from './Profile';
import AddDemo from './AddDemo';
import DemoOptions from './DemoOptions';
import Hexagon from './Hexagon';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/demos" exact component={Demos} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/log-out" exact component={LogOut} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/add-demo" exact component={AddDemo} />
        <Route path="/demo-options" exact component={DemoOptions} />
        <Route path="/hexagon" exact component={Hexagon} />
      </Switch>
    </Router>
  );
}

export default App;
