import React,{Component} from "react";
import Colorbox from './colorbox';
import Navbar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";
class Singlecolorpalette extends Component{
    constructor(props){
        super(props);
        this.shades=this.getshades(this.props.palette,this.props.color)
        this.state={
            format:"hex"
        }
        this.handlechange=this.handlechange.bind(this)
    }
    getshades(palette,findcolor){
        let shades=[];
        let colors=palette.colors;
        for(let color in colors){
            shades=shades.concat(colors[color].filter(color=>
                color.id===findcolor.name.toLowerCase()))
        }
        return shades.slice(1)
    }
    handlechange(val){
        this.setState({format:val})
    }
    render(){
        return(
            <div className="singlecolorpalette palette">
                <Navbar showslider={false} handlechange={this.handlechange}/>
                <div className="palette-colors">
                {this.shades.map(color=>(
                    <Colorbox 
                    key={color.name} 
                    name={color.name} 
                    background={color[this.state.format]} 
                    showlink={false}/>
                ))}
                <div className="goback colorbox">
                    <Link to={`/palette/${this.props.palette.id}`} className="back-button">Go Back</Link>
                    </div>
                </div>
                <Footer name={this.props.palette.paletteName} emoji={this.props.palette.emoji}/>
            </div> 
        )
    }
}
export default Singlecolorpalette;