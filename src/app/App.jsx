import React from 'react';
import './App.css';
import '../components/MainComponents/MainContent.css';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Demos from '../components/Pages/Demos';
import Login from '../components/Pages/Login';
import Home from '../components/Pages/Home';
import SignUpProducer from '../components/Pages/SignUpProducer';
import LogOut from '../components/Pages/LogOut';
import Profile from '../components/Pages/Profile';
import AddDemo from '../components/Pages/AddDemo';
import DemoOptions from '../components/Pages/DemoOptions';
import Hexagon from '../components/Pages/Hexagon';
import PageNotFound from '../components/Pages/PageNotFound';
import SignUpPage from '../components/Pages/SignUpPage';
import MyDemos from '../components/Pages/MyDemos';
import UserProvider from '../components/contexts/UserProvider';

function App() {
  return (

    <UserProvider>
      <Router>
        <Switch>
          <Route path="/demos" exact component={Demos} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
          <Route path="/sign-up" exact component={SignUpPage} />
          <Route path="/sign-up-producer" exact component={SignUpProducer} />
          <Route path="/log-out" exact component={LogOut} />
          <Route path="/my-demos/:user" exact component={MyDemos} />
          {/* <Route path="/profile" exact component={Profile} /> */}
          <Route path="/profile/:user" exact component={Profile} />
          <Route path="/add-demo/:user" exact component={AddDemo} />
          <Route path="/demo-options/:demo" exact component={DemoOptions} />
          <Route path="/hexagon" exact component={Hexagon} />
          <Route path="/test" exact component={Hexagon} />
          <Route path="/admin/:role/profile/:user" exact component={Profile} />
          <Route path="/admin/:role/demo-options/:demo" exact component={DemoOptions} />
          <Route path="/admin/:role/hexagon" exact component={Hexagon} />
          <Route path="/admin/:role/my-demos/:user" exact component={MyDemos} />
          <Route path="/admin/:role/add-demo/:user" exact component={AddDemo} />
          <Route path="/admin/:role/hexagon" exact component={Hexagon} />
          <Route path="/" component={PageNotFound} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
