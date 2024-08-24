import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete'
import chroma from 'chroma-js';

const Main = styled('div')({
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    "&:hover svg": {
        color: "white",
        transform: "scale(2.0)"
    },
    "@media (max-width: 1199.98px)": {
        width: "25%",
        height: "20%"
    },
    "@media (max-width: 991.98px)": {
        width: "50%",
        height: "10%"
    },
    "@media (max-width: 767.98px)": {
        width: "100%",
        height: "5%"
    }
});
const Drag = styled('div')({
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between'
});
const Delete = styled(DeleteIcon)({
    transition: 'all 0.3s ease-in-out'
});

const Dragcolorbox = SortableElement((props) => {
    const handleDelete = () => {
        props.deletecolor(props.name);
    };
    return (
        <Main style={{ backgroundColor: props.color }}>
            <Drag style={{color:chroma(props.color).luminance()<=0.08? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)"}}>
                <span>{props.name}</span>
                <Delete onClick={handleDelete} />
            </Drag>
        </Main>
    )
})
export default Dragcolorbox;