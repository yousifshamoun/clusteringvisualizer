import { Slider } from "@mui/material";
import {connect, ConnectedProps} from "react-redux"
import React from "react";
import { RootState } from "../reduxStore/reducers/index"
const mapStateToProps = (state: RootState) => ({
    global: state.global,
}
)
const mapDispathToProps = {
    changeNumberOfCentroids: (k: number) => ({
        type: "CHANGE_NUMBER_OF_CENTROIDS",
        payload: k
    })
}
const connector = connect(mapStateToProps, mapDispathToProps)
type PropsFromRedux = ConnectedProps<typeof connector>;

class CentroidSlider extends React.Component<PropsFromRedux> {
    public render () {
        return (
            <Slider
            disabled = {this.props.global.started}
            valueLabelDisplay="auto"
            color="secondary"
        min={2}
            max={10}
            value={this.props.global.k}
            onChange={(e, val) =>
                this.props.changeNumberOfCentroids(val as number)
            }
        />
        )
    }
}
export default connector(CentroidSlider)