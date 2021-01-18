import React from 'react';
import axios from "axios"
import { Redirect } from "react-router-dom";
import {Button, Box, Grid, Typography, Container, TextField} from '@material-ui/core';

export default function PostTask() {
    return (
        <Container>
            <Typography component="h1" variant="h5">
                Add a new task
            </Typography>
            <Grid container>
                <Grid item xs>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="first_name"
                        label="Title"
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
                        label="Subject Modulecode"
                        name="last_name"
                        autoFocus
                        onChange={e => this.last_name = e.target.value}
                    />
                </Grid>
            </Grid>
            <Grid container>
            
                <Grid item>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        fullWidth
                        autoFocus
                        margin="normal"

                        rowsMax={4}
                        // onChange={e => this.last_name = e.target.value}
                        variant="outlined"
                    />

                    {/* <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="last_name"
                        label="Description"
                        name="last_name"
                        autoFocus
                        onChange={e => this.last_name = e.target.value}
                    /> */}
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="last_name"
                        label="Planned Time"
                        name="last_name"
                        autoFocus
                        onChange={e => this.last_name = e.target.value}
                    />
                </Grid>

            </Grid>
        </Container>
        
    )
}