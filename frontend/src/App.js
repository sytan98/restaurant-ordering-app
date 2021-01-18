import React from 'react';
import './App.css';
import {Box, AppBar, Toolbar, Button} from '@material-ui/core';
import SignIn from "./components/signin.component";
import SignUp from "./components/signup.component";
import Copyright from "./components/copyright.component";
import Home from "./components/home.component";
import axios from "axios"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {email: '', first_name: '', last_name: '', isloggedin: false};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        this.setState({
            isloggedin: true
        });
    }
    componentDidMount(){
        const config = {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        console.log(config);
        axios.get('/api/v1/auth/user', config)
            .then(res => {
                console.log(res.data);
                this.setState({
                    email: res.data._id, 
                    first_name: res.data.first_name, 
                    last_name: res.data.last_name, 
                    isloggedin: true
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    

    render() {
        let buttons;
        if (this.state.isloggedin){
            buttons = (
                <Toolbar>
                    <Button color="inherit" href="/">Home</Button>
                    <Button color="inherit" href="/" onClick={()=> localStorage.clear()}>Logout</Button>
                </Toolbar>
            )
        } else {
            buttons = (
                <Toolbar>
                    <Button color="inherit" href="/">Home</Button>
                    <Button color="inherit" href="/login">Login</Button>
                    <Button color="inherit" href="/signup">Signup</Button>
                </Toolbar>
            )
        }
        return (
            <Router>
              <Box>
                <AppBar position="static">
                    {buttons}
                </AppBar>
        
                <Switch>
                    <Route exact path="/" component = { () =>
                        <Home 
                            email= {this.state.email} 
                            first_name={this.state.first_name}
                            last_name={this.state.last_name}
                            isloggedin = {this.state.isloggedin}
                        />}
                    />
                    <Route path="/login" component = { () =>
                        <SignIn 
                            handler={this.handleChange}
                        />}
                    />
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
