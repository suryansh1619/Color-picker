import React, { Component } from "react";
import './CSS/minipalette.css';
import DeleteIcon from '@mui/icons-material/Delete';

class Minipalette extends Component {
  constructor(props) {
    super(props);
    this.deletepalette = this.deletepalette.bind(this);
  }

  deletepalette(e) {
    e.stopPropagation()
    this.props.deletepalette(this.props.id)
  }


  render() {
    return ( 
      <div className="minipalette-main" onClick={this.props.gotopalette}>
          <DeleteIcon 
            className="minipalette-deleteicon"
            onClick={this.deletepalette}
          />
        <div className="minipalette-colors">
          {this.props.palette.colors.map(color => (
            <div
              key={color.name} 
              className="minipalette-minicolor" 
              style={{backgroundColor: color.color}}
            />
          ))}
        </div>
        <h5 className="minipalette-title">
          {this.props.palette.paletteName}
          <span className="minipalette-emoji">{this.props.palette.emoji}</span>
        </h5>
      </div>
    );
  }
}

export default Minipalette;
