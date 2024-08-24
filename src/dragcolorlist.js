import React from "react";
import {SortableContainer} from 'react-sortable-hoc'
import Dragcolorbox from "./dragcolorbox";
const Dragcolorlist=SortableContainer((props)=>{
    return(
        <div style={{height:"100%"}}>
            {props.colors.map((color,index) => (
                <Dragcolorbox 
                index={index}
                key={color.name} 
                color={color.color} 
                name={color.name} 
                deletecolor={props.deletecolor}/>
            ))}
        </div>
    )
})

export default Dragcolorlist;