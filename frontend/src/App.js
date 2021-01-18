import React from 'react';
import './App.css';
import {Box, AppBar, Toolbar, Button} from '@material-ui/core';
import SignIn from "./components/signin.component";
import SignUp from "./components/signup.component";
import Copyright from "./components/copyright.component";
import Home from "./components/home.component";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends React.Component {
   
    render() {
        return (
            <Router>
              <Box>
                <AppBar position="static">
                  <Toolbar>
                        <Button color="inherit" href="/">Home</Button>
                        <Button color="inherit" href="/login">Login</Button>
                        <Button color="inherit" href="/signup">Signup</Button>
                  </Toolbar>
                </AppBar>
        
                <Switch>
                    <Route exact path="/" component = {Home}/>
                    <Route path="/login" component = {SignIn}/>
                    <Route path="/signup" component = {SignUp}/>
                </Switch>
                <Box mt={8}>
                    <Copyright/>
                </Box>
              </Box>
            </Router>
          );
    }
    
}
