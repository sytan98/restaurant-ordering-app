import {Button, Box, Grid, Link, Container} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import axios from "axios"
import { Redirect } from 'react-router-dom';


export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false, // <-- initialize the signup state as false
            isError: false
        }
    }   
    onSubmitClick = (e)=>{
        e.preventDefault()
        console.log("You pressed login")
        let data = {
            '_id': this.username,
            'password': this.password
        }
        axios.post("/api/v1/auth/login", data)
            .then(res => {
                console.log(res.data.token);
                localStorage.setItem('token', res.data.token);
                this.setState({
                    isLoggedIn: true
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    isError: true
                });
            })
    }
    render() {
        if (this.state.isLoggedIn){
            return <Redirect to='/'/>;
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <div>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => this.username = e.target.value}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => this.password = e.target.value}
                        />
                        <Box m={2}> 
                            <Typography variant="body2" color="error">{this.state.isError ? 'Incorrect Username or Password': ''}</Typography>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.onSubmitClick}
                        >
                        Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    </div>
            
                </Container>
            );
        }
        
    }
    
}