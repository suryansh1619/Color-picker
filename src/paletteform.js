import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ChromePicker } from 'react-color';
import withTheme from './withTheme'; 
import withNavigate from "./withNavigate";
import { Button} from "@mui/material";
import Dragcolorlist from "./dragcolorlist";
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from "react-sortable-hoc";
import Palettedetails from "./palettedetails";
import seedcolors from './seedcolors';

const drawerWidth = 400;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding:0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const Root =styled('div')({
    display: 'flex'
})

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    height:"64px",
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    width:"100%",
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Navbtn=styled('div')({
    marginRight:"1rem",
    "@media (max-width:767.98px)": {
        marginRight:"0.5rem"
    }
})
const Gobtn=styled(Button)({
    margin:"0 0.5rem",
    "@media (max-width:767.98px)": {
        margin:"0"
    }
})
const Savebtn=styled(Button)({
    margin:"0 0.5rem",
    "@media (max-width:767.98px)": {
        margin:"0"
    }
})

const Drawercontainer=styled('div')({
    width: "90%",
    height:"100%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
})

const Picker=styled(ChromePicker)({
    width:"100% !important",
    marginTop:"2rem",
})

const Addcolor=styled(Button)({
    width:"100% ",
    padding:"1rem",
    marginTop:"1rem",
    fontSize:"2rem"
})

const Inputcolor=styled(TextValidator)({
    width:"100% ",
    height:"70px",
})
const Buttons=styled('div')({
    width: "100%"
})
const Randbtn=styled(Button)({
    width:"50% "
})
const Clearbtn=styled(Button)({
    width:"50% "
})



class Paletteform extends Component {
    static defaultProps={
        maxcolors:20
    }
    constructor(props) {
        super(props);
        this.state = {
            draweropen: true,
            color: { hex: "#18B0C7" },
            name: "",
            colors:seedcolors[0].colors,
            open:false
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.addnewcolor = this.addnewcolor.bind(this);
        this.handlechange = this.handlechange.bind(this);
        this.deletecolor=this.deletecolor.bind(this);
        this.handleclear=this.handleclear.bind(this);
        this.handlerandom=this.handlerandom.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('iscolorname', (value) => {
            return this.state.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule('iscolor', (value) => {
            return this.state.colors.every(
                ({ color }) => color !== this.state.color.hex
            );
        });
    }

    handleDrawerOpen = () => {
        this.setState({ draweropen: true });
    };

    handleDrawerClose = () => {
        this.setState({ draweropen: false });
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleColorChange(color) {
        this.setState({ color: color });
    }

    addnewcolor() {
        const newcolor = {
            color: this.state.color.hex,
            name: this.state.name
        };
        this.setState({ colors: [...this.state.colors, newcolor], name: '' });
    }

    handlechange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    deletecolor(ncolor){
        this.setState({
            colors: this.state.colors.filter((color) => color.name !== ncolor)
        })
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    }
    handleclear(){
        this.setState({colors:[]})
    }
    handlerandom(){
        let allpalettes=[];
        this.props.palettes.forEach((palette) => {
            allpalettes=[...allpalettes,palette]
        })
        let randompalette=allpalettes[Math.floor(Math.random()*allpalettes.length)]
        let allcolors=[];
        randompalette.colors.forEach((color)=>{
            allcolors=[...allcolors,color]
        })
        let randomcolor=allcolors[Math.floor(Math.random()*allcolors.length)]
        while (this.state.colors.some(color=>color.name.toLowerCase()===randomcolor.name.toLowerCase())) {
            console.log('fuck')
            randomcolor=allcolors[Math.floor(Math.random()*allcolors.length)]
        }
        this.setState({colors:[...this.state.colors,randomcolor]})
    }

    render() {
        const { draweropen, color } = this.state;
        const { theme } = this.props;

        return (
            <Box sx={{ display: 'flex' }}>
                <Root>
                    <CssBaseline />
                    <AppBar position="fixed" open={draweropen} color="default">
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(draweropen && { display: 'none' }) }}
                            >
                                <AddToPhotosIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                Create a Palette
                            </Typography>
                        </Toolbar>
                        <Navbtn>
                        <Link to="/"><Gobtn variant='contained' color='secondary'>Go Back</Gobtn></Link>
                        <Savebtn variant="contained" onClick={this.handleClickOpen}>Save</Savebtn>
                        <Palettedetails 
                        colors={this.state.colors} 
                        savepalette={this.props.savepalette} 
                        palettes={this.props.palettes}
                        open={this.state.open}
                        handleClose={this.handleClose}/>
                        </Navbtn>
                    </AppBar>
                    </Root>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            display:"flex",
                            alignItems:"center"
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={draweropen}
                >
                    <DrawerHeader>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <Drawercontainer>
                        <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
                        <Buttons>
                            <Clearbtn 
                            variant='contained' 
                            color='secondary' 
                            onClick={this.handleclear}>Clear Palette</Clearbtn>
                            <Randbtn 
                            variant='contained' 
                            color='primary' 
                            onClick={this.handlerandom}
                            disabled={this.state.colors.length>=this.props.maxcolors} >Random Color</Randbtn>
                        </Buttons>
                        <Picker
                            color={color.hex}
                            onChangeComplete={this.handleColorChange}
                        />
                        <ValidatorForm onSubmit={this.addnewcolor} instantValidate={false}>
                            <Inputcolor
                                value={this.state.name}
                                name="name"
                                variant="filled"
                                margin="normal"
                                placeholder="Color Name"
                                onChange={this.handlechange}
                                validators={["required", 'iscolorname', 'iscolor']}
                                errorMessages={["Enter Color Name", "Color Name must be unique", "Color Already Used"]}
                            />
                            <Addcolor
                                variant='contained'
                                type='submit'
                                color='primary'
                                disabled={this.state.colors.length>=this.props.maxcolors} 
                                style={{ backgroundColor: this.state.colors.length>=this.props.maxcolors ? 'grey' : this.state.color.hex }}
                            >{this.state.colors.length>=this.props.maxcolors ? "Palette Full" : "Add Color"} 
                            </Addcolor>
                        </ValidatorForm>
                    </Drawercontainer>
                </Drawer>
                <Main open={draweropen}>
                    <DrawerHeader />
                    <Dragcolorlist 
                    colors={this.state.colors}
                    deletecolor={this.deletecolor}
                    axis='xy'
                    onSortEnd={this.onSortEnd}/>
                </Main>
            </Box>
        );
    }
}

export default withTheme(withNavigate(Paletteform));
