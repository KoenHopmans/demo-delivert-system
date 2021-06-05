import React from 'react';
import './App.css';
import '../components/MainContentComponents/MainContent.css';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Demos from '../components/Pages/Demos';
import Login from '../components/Pages/Login';
import Home from '../components/Pages/Home';
import SignUp from '../components/Pages/SignUp';
import LogOut from '../components/Pages/LogOut';
import Profile from '../components/Pages/Profile';
import AddDemo from '../components/Pages/AddDemo';
import DemoOptions from '../components/Pages/DemoOptions';
import Hexagon from '../components/Pages/Hexagon';
import PageNotFound from '../components/Pages/PageNotFound';

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
        <Route path="/" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
