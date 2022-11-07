import { Slider } from "@mui/material";
import {connect, ConnectedProps} from "react-redux"
import React from "react";
import { RootState } from "../reduxStore/reducers/index"
const mapStateToProps = (state: RootState) => ({
    global: state.global,
}
)
const mapDispathToProps = {
    changeEpsilon: (eps: number) => ({
        type: "CHANGE_EPSILON",
        payload: eps
    })
}
const connector = connect(mapStateToProps, mapDispathToProps)
type PropsFromRedux = ConnectedProps<typeof connector>;

class EpsilonSlider extends React.Component<PropsFromRedux> {
    public render () {
        return (
            <Slider
            disabled = {this.props.global.started}
            valueLabelDisplay="auto"
            color="secondary"
            min={20}
            max={100}
            step = {5}
            value={this.props.global.eps}
            onChange={(e, val) =>
                this.props.changeEpsilon(val as number)
            }
        />
        )
    }
}
export default connector(EpsilonSlider)