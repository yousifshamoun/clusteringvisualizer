import React from "react"; 
import {AppBar, Button} from '@mui/material';
import kMeans from "../Algorithms/kMeans" 
//Variables
const NavBar = () => {
    return (
    <AppBar position="static">
        <Button variant="contained"
        onClick={kMeans}>Test</Button>
    </AppBar>
    )
}
export default NavBar