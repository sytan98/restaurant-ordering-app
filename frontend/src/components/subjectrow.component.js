import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
export default class SubjectRow extends React.Component {
    render() {
        return (
            <TableRow key={this.props.modulecode}>
                <TableCell component="th" scope="row">{this.props.name}</TableCell>
                <TableCell align="right">{this.props.modulecode}</TableCell>
                <TableCell align="right">{this.props.difficulty}</TableCell>
                <TableCell align="right">{this.props.last_modified}</TableCell>
            </TableRow>
        )
    }
}