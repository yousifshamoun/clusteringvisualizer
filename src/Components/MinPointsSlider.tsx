import { Slider } from "@mui/material";
import {connect, ConnectedProps} from "react-redux"
import React from "react";
import { RootState } from "../reduxStore/reducers/index"
const mapStateToProps = (state: RootState) => ({
    global: state.global,
}
)
const mapDispathToProps = {
    changeMinPoints: (min: number) => ({
        type: "CHANGE_MIN_POINTS",
        payload: min
    })
}
const connector = connect(mapStateToProps, mapDispathToProps)
type PropsFromRedux = ConnectedProps<typeof connector>;

class MinPointsSlider extends React.Component<PropsFromRedux> {
    public render () {
        return (
            <Slider
            disabled = {this.props.global.started}
            valueLabelDisplay="auto"
            color="secondary"
            min={2}
            max={10}
            value={this.props.global.minPoints}
            onChange={(e, val) =>
                this.props.changeMinPoints(val as number)
            }
        />
        )
    }
}
export default connector(MinPointsSlider)