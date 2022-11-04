import {AppBar, Button, Typography,Stack, Box} from '@mui/material';
import kMeans from "../Algorithms/kMeans" 
import store from "../reduxStore";
import naiveRandom from "../Algorithms/naiveRandom";
import SpeedController from './SpeedController';


//Variables
const NavBar = () => {
    const paused: boolean =  store.getState().global.paused
    return (
    <AppBar position="static">
        <Typography
        variant="h6"
        mt={2}
        ml={2}
        mb={2}>Clustering Visualizer</Typography>

        <Box sx={{ width: 500 }}>
            <Stack direction="row" spacing={2}>
                {store.getState().global.paused ? <Button
                variant='contained' onClick={() => {store.dispatch({type: "RESUME"})}}>Resume</Button> : <Button variant='contained' onClick={() => {store.dispatch({type: "PAUSE"})}}>Pause</Button>}
                <Button variant="contained"
                    onClick={kMeans}>kMeans</Button>
                <Button variant="contained"
                    onClick={naiveRandom}>Random</Button>
                <SpeedController/>
            </Stack>
        </Box>
    </AppBar>
    )
}

export default NavBar