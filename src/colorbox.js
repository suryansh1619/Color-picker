import React,{Component} from 'react';
import './CSS/colorbox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

class Colorbox extends Component{
    constructor(props){
        super(props);
        this.state={
            copied:false
        };
        this.changecopystate=this.changecopystate.bind(this);
    }
    changecopystate(){
        this.setState({copied:true},()=>{
            setTimeout(()=>this.setState({copied:false}),1500)
        })
    }
    render(){
        const isdark=chroma(this.props.background).luminance() <=0.08;
        const islight=chroma(this.props.background).luminance() >=0.7;
        return(
            <CopyToClipboard text={this.props.background} onCopy={this.changecopystate}>
            <div style={{background:this.props.background}} className='colorbox'>
                <div style={{background:this.props.background}} className={`copy-overlay ${this.state.copied && "show"}`}/>
                <div className={`copy-msg ${this.state.copied && "show"}`}>
                    <h1 className={islight && "dark-text"} >copied!</h1>
                    <p className={islight && "dark-text"}>{this.props.background}</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span className={isdark &&"light-text"}>{this.props.name}</span>
                    </div>
                    <button className={`copy-button ${islight && "dark-text"}`}>Copy</button>

                </div>
                {this.props.showlink &&(
                <Link to={`/palette/${this.props.paletteid}/${this.props.colorid}`} onClick={(e=>e.stopPropagation())}>
                <span className={`see-more ${islight && "dark-text"}`}>More</span>
                </Link>)
                }            
            </div>
            </CopyToClipboard>
        )
    }
}
export default Colorbox;