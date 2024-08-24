import React from "react";

function Footer(props){
    return (
        <footer className='palette-footer'>
            {props.name}
            <span className='emoji'>{props.emoji}</span>
        </footer>
    )
}

export default Footer;