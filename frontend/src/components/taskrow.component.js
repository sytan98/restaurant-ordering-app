import React from 'react';
import { Container, Box } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
export default class TaskRow extends React.Component {
    render() {
        return (
            <ListItem role={undefined} dense button> 
                <ListItemIcon>
                    <Checkbox
                    edge="start"
                    />
                </ListItemIcon>
                <ListItemText
                    primary={this.props.title}
                    secondary={this.props.description}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}