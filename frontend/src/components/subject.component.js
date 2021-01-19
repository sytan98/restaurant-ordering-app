import React from 'react';
import {Box, Button, Container} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios from "axios"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PostSubject from './postsubject.component';
import SubjectRow from './subjectrow.component';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}   
  
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
  
export default class Subject extends React.Component {
    constructor(props){
        super(props);
        this.state = {subjects:[]};
    }

    componentDidMount(){
        console.log("Subject")
        const config = {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get('/api/v1/subjects', config)
            .then(res => {
                console.log(res.data);
                this.setState({subjects: res.data});
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    render() {
        return(
            <Container>
                <Box mt={8}>
                    <PostSubject/>
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Module Code</TableCell>
                        <TableCell align="right">Difficulty</TableCell>
                        <TableCell align="right">Last Modified</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.subjects.map((subject) => 
                            <SubjectRow 
                                name={subject.name} 
                                difficulty={subject.difficulty} 
                                last_modified={subject.last_modified} 
                                modulecode={subject.modulecode}/>
                        )}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            
        )
    }
       
}

