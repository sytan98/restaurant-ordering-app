import React from 'react';
import axios from "axios"
import { Redirect } from "react-router-dom";
import {Button, Box, Grid, Typography, Container, TextField} from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

export default function PostSubject() {
    return (
        <Container>
            <Typography component="h1" variant="h5">
                Add a new subject
            </Typography>
            <form noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="modulecode"
                            label="Modulecode"
                            name="modulecode"
                            autoFocus
                            onChange={e => this.last_name = e.target.value}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoFocus
                            onChange={e => this.first_name = e.target.value}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center">
                
                    <Grid item xs={6}>
                        <Typography id="discrete-slider" gutterBottom>
                            Difficulty
                        </Typography>
                        <Slider
                            defaultValue={30}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={5}
                        />
                    </Grid>
                    <Grid item xs ={3}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // onClick={this.onSubmitClick}
                        >
                            Add Subject
                        </Button>
                    </Grid>            
                </Grid>
            </form>
        </Container>
        
    )
}