import {Box, Button, Container} from '@material-ui/core';
import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import axios from "axios"
import Subject from "./subject.component";
import CheckboxList from "./task.component"
export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {email: '', first_name: '', last_name: '', isloggedin: false};
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
        
        if (this.state.isloggedin){
            return(
                <Container maxWidth = "lg">
                    
                    <Box mt={8}>
                        <Typography varuant="h2"> Welcome {this.state.first_name} {this.state.last_name}! </Typography>   
                    </Box>
                    <Box mt={8}>
                        <CheckboxList/>
                        <Subject/>
                    </Box>

                </Container>
            )
        } else{
            return(
                <Container maxWidth = "sm">
                    <Box mt={8}>
                        <Typography variant="h1">
                            Welcome to my Study Planner App
                        </Typography>
                    </Box>
                    <Box mt={8}>
                        <Typography varuant="h2"> You have not logged in. Log In or Sign Up to use the app.</Typography> 
                    </Box>
                    <Box mt={8}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            href="/login"
                        >
                            Log In / Sign Up Page
                        </Button>
                    </Box>
                </Container>
            )
        }
        
            
    }
       
}

