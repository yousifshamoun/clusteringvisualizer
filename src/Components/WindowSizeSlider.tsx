import { Slider } from "@mui/material";
import {connect, ConnectedProps} from "react-redux"
import React from "react";
import { RootState } from "../reduxStore/reducers/index"
const mapStateToProps = (state: RootState) => ({
    global: state.global,
}
)
const mapDispathToProps = {
    changeWindowSize: (windowSize: number) => ({
        type: "CHANGE_WINDOW_SIZE",
        payload: windowSize
    })
}
const connector = connect(mapStateToProps, mapDispathToProps)
type PropsFromRedux = ConnectedProps<typeof connector>;

class WindowSizeSlider extends React.Component<PropsFromRedux> {
    public render () {
        return (
            <Slider
            disabled = {this.props.global.started}
            valueLabelDisplay="auto"
            color="secondary"
            min={20}
            step = {5}
            max={200}
            value={this.props.global.windowSize}
            onChange={(e, val) =>
                this.props.changeWindowSize(val as number)
            }
        />
        )
    }
}
export default connector(WindowSizeSlider)