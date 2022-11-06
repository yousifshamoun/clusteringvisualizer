import React from "react"
import {AppBar, Button, Stack, Box} from '@mui/material';
import kMeans from "../Algorithms/Clustering/kMeans"
import meanShift from "../Algorithms/Clustering/meanShift";
import RandomMenu from "./RandomMenu";
import AlgorithmMenu from "./AlgorithmMenu";
import SpeedController from './SpeedController';
import { RootState } from "../reduxStore/reducers/index"
import { connect, ConnectedProps } from 'react-redux';
import CentroidSlider from "./CentroidSlider";
import WindowSizeSlider from "./WindowSizeSlider";
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
type NavBarState = {noAlgo: boolean}
class NavBar extends React.Component<PropsFromRedux, NavBarState> {
    constructor(props: PropsFromRedux) {
        super(props);
        this.state = {
            noAlgo: true
        };
      }
    handleStart = () => {
        switch (this.props.global.algorithm) {
            case "kmeans":
                kMeans()
                this.setState({
                    noAlgo: false
                  })
                break;
            case "meanshift":
                meanShift()
                this.setState({
                    noAlgo: false
                  })
                break;
            default:
                this.setState({
                    noAlgo: true
                  })
        }
    }
    public render() {
    return (
    <AppBar position="static">
        <Box sx={{ width: 1000 }}>
            <Stack direction="row" spacing={5}>
                <AlgorithmMenu {...this.props.global}/>
                <RandomMenu
                {...this.props.global}/>
                {this.props.global.started ? (this.props.global.paused ?
                    <Button
                    variant='contained' color="secondary" onClick={this.props.resume}>Resume</Button>
                    : 
                    <Button color="secondary" variant='contained' onClick={this.props.pause}>Pause</Button>):(<Button
                        variant='contained'
                        color="secondary"
                        onClick={this.handleStart}
                        disabled = {this.props.global.started}>
                            {this.state.noAlgo && !this.props.global.algorithm ?
                         "Select an Algorithm" : this.props.global.points.length <= 2 ? "Plot points": "Visualize !"}
                </Button>)}
                {this.props.global.algorithm === "kmeans" ? <span>Set k clusters
                    <CentroidSlider/>
                </span> : null}
                {this.props.global.algorithm === "meanshift" ? <span>Set Window Size
                    <WindowSizeSlider/>
                </span> : null}
                <SpeedController/>
                <Button
                    variant='contained'
                    disabled = {this.props.global.started}
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