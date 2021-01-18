import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from "axios"
import { Redirect } from "react-router-dom";
import {Button, Box, Grid, Typography, Container} from '@material-ui/core';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedUp: false // <-- initialize the signup state as false
        }
    }   
    onSubmitClick = (e)=>{
        e.preventDefault()
        console.log("You pressed sign up")
        let data = {
            '_id': this.username,
            'password': this.password,
            'first_name' : this.first_name,
            'last_name' : this.last_name
        }
        console.log(data)
        axios.post("/api/v1/auth/signup", data)
            .then(res => {
                console.log(res.data.token);
                localStorage.setItem('token', res.data.token);
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        if (this.state.isSignedUp){
            return <Redirect to='/'/>;
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <div>
                    <Box mt={8}>
                        <Typography component="h1" variant="h5">
                            Create an Account
                        </Typography>
                    </Box>
                    <form noValidate>
                        <Grid container>
                            <Grid item xs>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    name="first_name"
                                    autoFocus
                                    onChange={e => this.first_name = e.target.value}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoFocus
                                    onChange={e => this.last_name = e.target.value}
                                />
                            </Grid>
    
                        </Grid>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.onSubmitClick}
                        >
                        Sign Up
                        </Button>
                    </form>
                    </div>
            
                </Container>
            );
        }
        
    }
    
}