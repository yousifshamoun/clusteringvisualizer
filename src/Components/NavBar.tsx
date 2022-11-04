import React from "react"
import {AppBar, Button, Typography,Stack, Box} from '@mui/material';
import kMeans from "../Algorithms/kMeans" 
import store from "../reduxStore";
import RandomMenu from "./RandomMenu";
import SpeedController from './SpeedController';
import { RootState } from "../reduxStore/reducers/index"
import { connect, ConnectedProps } from 'react-redux';
import CentroidSlider from "./CentroidSlider";
const mapState = (state: RootState) => ({
    global: state.global
})
const mapDispatch = {
    pause: () => ({
        type: "PAUSE"
    }),
    resume: () => ({
        type: "RESUME"
    }),
    reset: () => ({
        type: "RESET"
    })
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
//Variables
class NavBar extends React.Component<PropsFromRedux> {
    constructor(props: PropsFromRedux) {
        super(props)
    }
    public render() {
    return (
    <AppBar position="static">
        {/* <Typography
        variant="h6"
        mt={2}
        ml={2}
        mb={2}>Clustering Visualizer</Typography> */}

        <Box sx={{ width: 1000 }}>
            <Stack direction="row" spacing={5}>
                {this.props.global.paused ? 
                    <Button
                        variant='contained' onClick={this.props.resume}>Resume</Button>
                         : 
                    <Button variant='contained' onClick={this.props.pause}>Pause</Button>}
                <Button variant="contained"
                    disabled = {this.props.global.started}
                    onClick={kMeans}>kMeans</Button>
                <RandomMenu
                 {...this.props.global}/>
                <SpeedController/>
                <span>Set k clusters
                    <CentroidSlider/>
                </span>
                <Button
                    variant='contained'
                    onClick = {this.props.reset}
                    >RESET
                </Button>
            </Stack>
        </Box>
    </AppBar>
    )
}
}

export default connector(NavBar)