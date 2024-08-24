import React, { Component } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator,ValidatorForm } from "react-material-ui-form-validator";
import withNavigate from "./withNavigate";

class Palettedetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newpalettename: "",
            newemoji:""
        };
        this.handlechange=this.handlechange.bind(this);
        this.savepalette=this.savepalette.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('ispalette', (value) => {
            return this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    }
    handlechange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    savepalette() {
        const newpalette = {
            paletteName: this.state.newpalettename,
            id: this.state.newpalettename.toLowerCase().replace(/ /g, '-'),
            emoji: this.state.newemoji,
            colors: this.props.colors
        };
        this.props.savepalette(newpalette);
        this.props.handleClose();
        this.props.navigate('/');
    }
    render() {
        return (
            <React.Fragment>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                >
                    <DialogTitle>Choose a Palette Name</DialogTitle>
                    <ValidatorForm 
                        onSubmit={this.savepalette}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your palette. Make sure it is unique.
                            </DialogContentText>
                            <TextValidator
                                label='Palette Name'
                                name="newpalettename"
                                value={this.state.newpalettename}
                                onChange={this.handlechange}
                                fullWidth
                                margin="normal"
                                validators={['required','ispalette']}
                                errorMessages={['Enter Palette Name','Palette Name Must be Unique']}
                            />
                            <TextValidator
                                label='Emoji'
                                name="newemoji"
                                value={this.state.newemoji}
                                onChange={this.handlechange}
                                fullWidth
                                margin="normal"
                                validators={['required']}
                                errorMessages={['Enter Palette Name']}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.handleClose}>Cancel</Button>
                            <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </React.Fragment>
        );
    }
}
export default withNavigate(Palettedetails)