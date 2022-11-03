import React from "react"; 
import {AppBar, Button, Typography,Grid} from '@mui/material';
import kMeans from "../Algorithms/kMeans" 
import store from "../reduxStore";
import naiveRandom from "../Algorithms/naiveRandom";
//Variables
const NavBar = () => {
    return (
    <AppBar position="static">
        <Typography
        variant="h6"
        mt={2}
        ml={2}
        mb={2}>Clustering Visualizer</Typography>
        <Grid ><Button variant="contained"
        onClick={() => {store.dispatch({type: "PAUSE_RENDER"})}}>Pause</Button><Button variant="contained"
        onClick={kMeans}>Test</Button>
        <Button variant="contained"
        onClick={naiveRandom}>Random</Button></Grid>
    </AppBar>
    )
}
export default NavBar