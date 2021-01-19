import React from 'react';
import List from '@material-ui/core/List';
import { Container, Box, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import PostTask from "./posttask.component"
import TaskRow from "./taskrow.component"
import axios from "axios"

export default class CheckboxList extends React.Component {
    // const [checked, setChecked] = React.useState([0]);
    constructor(props){
        super(props);
        this.state = {tasks:[]};
    }
    // const handleToggle = (value) => () => {
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //     newChecked.push(value);
    // } else {
    //     newChecked.splice(currentIndex, 1);
    // }
    componentDidMount(){
        const config = {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get('/api/v1/tasks', config)
            .then(res => {
                console.log(res.data);
                this.setState({tasks: res.data});
                console.log(this.state.tasks.length);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render(){
        return (
            <Container>
                <Box mt={8}>
                    <PostTask/>
                </Box>
                <Box mt={8}>
                <Paper>
                {this.state.tasks.length > 0 ? (
                    <List> 
                        {this.state.tasks.map((task) =>
                            // onClick={handleToggle(value)
                            <TaskRow title={task.title} description={task.description}/>)}
                    </List>
                ): (
                    <Box mt={8}>
                        <Typography variant="body">
                            No Tasks at the moment.
                        </Typography>
                    </Box>
                )
                }
                
                </Paper>
                </Box>
    
            </Container>
        
    
        );
    }
    
}