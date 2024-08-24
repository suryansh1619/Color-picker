import React,{Component} from 'react';
import Colorbox from './colorbox';
import './CSS/palette.css'
import Navbar from './navbar';
import Footer from './footer';
class Palette extends Component{
    constructor(props){
        super(props);
        this.state={
            level:500,
            format:"hex"
        }
        this.changelevel=this.changelevel.bind(this);
        this.handlechange=this.handlechange.bind(this);
    }
    changelevel(newl){
        this.setState({level:newl})
    }
    handlechange(val){
        this.setState({format:val})
    }
    render(){
        const colors=this.props.colors[this.state.level].map(color=>(
            <Colorbox 
            key={color.id} 
            background={color[this.state.format]} 
            name={color.name}
            paletteid={this.props.id}
            colorid={color.id}
            showlink={true}
            showingFullPalette/>
        ))
        return(
            <div className='palette'>
                <Navbar showslider={true} level={this.state.level}  changelevel={this.changelevel} handlechange={this.handlechange}/>
                <div className='palette-colors'>
                    {colors}
                </div>
                <Footer name={this.props.paletteName} emoji={this.props.emoji}/>
            </div>
        )
    }
}
export default Palette;