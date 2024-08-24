import React, { Component } from "react";
import { Link } from "react-router-dom";
import Minipalette from "./minipalette";
import withNavigate from "./withNavigate";
import './CSS/palettelist.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class Palettelist extends Component {
    gotopalette(id) {
        this.props.navigate(`/palette/${id}`)
    }
    render() {
        const palettes = this.props.palettes;
        return (
            <div className="palettelist-main">
                <div className="palettelist-container">
                    <nav className="palettelist-nav">
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className="palettelist-palette">
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                                <Minipalette
                                    key={palette.id}
                                    id={palette.id}
                                    deletepalette={this.props.deletepalette}
                                    palette={palette}
                                    gotopalette={() => this.gotopalette(palette.id)} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}
export default withNavigate(Palettelist);