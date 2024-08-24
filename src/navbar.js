import React,{Component} from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Link } from "react-router-dom";
import './CSS/navbar.css'
class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={
            format:"hex",
            open:false
        }
        this.handlechange=this.handlechange.bind(this);
        this.closesnakbar=this.closesnakbar.bind(this);
    }
    handlechange(e){
        this.setState({format:e.target.value, open:true});
        this.props.handlechange(e.target.value);
    }
    closesnakbar(){
        this.setState({open:false})
    }
    render(){
        return(
            <header className="navbar">
                <div className="logo">
                    <Link to="/">React Color Piker</Link>
                </div>
                {this.props.showslider && (
                <div className='slider'>
                    <div className="slider-container">
                        <span>Level: {this.props.level}</span>
                        <Slider defaultValue={this.props.level} min={100} max={900} onAfterChange={this.props.changelevel} step={100}/>
                    </div>
                </div>
                )}
                <div className="select-container">
                    <Select value={this.state.format} onChange={this.handlechange}>
                        <MenuItem value="hex">HEX-#ffffff</MenuItem>
                        <MenuItem value="rgb">RGB-rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA-rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                anchorOrigin={{vertical:"bottom",horizontal:"left"}} 
                open={this.state.open}
                autoHideDuration={3000}
                message={<span id="message-id">Format Changed to {this.state.format.toUpperCase()}</span>}
                ContentProps={{"aria-describedby":"message-id"}}
                onClose={this.closesnakbar}
                action={[<IconButton 
                        onClick={this.closesnakbar} 
                        color="inherit"
                        key="close"
                        aria-label="close">
                        <CloseIcon/>
                    </IconButton>]}></Snackbar>
            </header>
        )
    }
}
export default Navbar;