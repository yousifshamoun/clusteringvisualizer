import {connect, ConnectedProps} from "react-redux";
import React, { ReactElement } from "react";
import {Point} from "../../reduxStore/reducers/global"
import { RootState } from "../../reduxStore/reducers/index"
import getSquareDistance from "../../utils/getSquareDistance";
import getRandomColor from "../../utils/getRandomColor";
import {v4 as uuidv4 } from "uuid"

const mapState = (state: RootState) => ({
    global: state.global
})

const mapDispatch = {
    addSec: (element: ReactElement) => ({
        type: "ADD_TO_RENDER_SEC",
        payload: element
    })
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>;
type dbScanProps = {
    color: string[],
    scanned: Set<number>
}

class dbScan extends React.Component<PropsFromRedux, dbScanProps> {
    constructor(props: PropsFromRedux) {
        super(props)
        this.handleDBScan = this.handleDBScan.bind(this)
        this.state = {
            color: [],
            scanned: new Set()
        }
    }
    handleSearch = async (inititalPoint: Point) => {
        let q: Point[] = [inititalPoint]
        let firstToBeColored: boolean = true 
        while (q.length) {
            const point = q[0]
            q.shift()
            let cur: Point[] = []
            for (let i = 0; i < this.props.global.points.length; i += 1) {
                if (point?.id === this.props.global.points[i].id) {
                    continue
                }
                if (this.props.global.eps >= getSquareDistance(point, this.props.global.points[i]) && !this.state.scanned.has(this.props.global.points[i].id)) {
                    cur.unshift(this.props.global.points[i])
                }
            }
            if (cur.length + 1 >= this.props.global.minPoints) {
                q = [...q, ...cur]
                if (firstToBeColored) {
                    firstToBeColored = false
                    let curColor = this.state.color
                    curColor.push(getRandomColor())
                    this.setState({color: curColor})
                    let curScanned = this.state.scanned
                    curScanned.add(point.id)
                    this.setState({scanned: curScanned})
                    this.props.addSec(
                        <g key = {uuidv4()}>
                            <circle
                                r={9}
                                cx={point.coordinates[0]}
                                cy={point.coordinates[1]}
                                fill = {this.state.color[this.state.color.length - 1]}
                                stroke="black"
                                strokeWidth="0.5"
                                />
                        </g>
                    )
                }
                this.props.addSec(
                    <g key = {uuidv4()}>
                        <circle
                            r = {this.props.global.eps}
                            cx={point.coordinates[0]}
                            cy={point.coordinates[1]}
                            stroke = {this.state.color[this.state.color.length - 1]}
                            strokeWidth="3"
                            fill="transparent"/>
                    </g>
                )
                this.props.addSec(
                    <g key = {uuidv4()}>
                        <circle
                            r = {this.props.global.eps}
                            cx = {point.coordinates[0]}
                            cy = {point.coordinates[1]}
                            opacity="0.06"
                            stroke = {this.state.color[this.state.color.length - 1]}
                            strokeWidth="3"
                            fill = {this.state.color[this.state.color.length - 1]}
                            />
                    </g>
                )
                for (let i = 0; i < cur.length; i += 1) {
                    let loopScanned = this.state.scanned
                    loopScanned.add(cur[i].id)
                    this.setState({scanned: loopScanned})
                    this.props.addSec(
                        <g key = {uuidv4()}>
                            <circle
                                r={9}
                                cx={cur[i].coordinates[0]}
                                cy={cur[i].coordinates[1]}
                                fill = {this.state.color[this.state.color.length - 1]}
                                stroke="black"
                                strokeWidth="0.5" />

                        </g>
                    )
                }
            }
            await new Promise((res) => setTimeout(res, this.props.global.delay))
        }
        
    }
    handleDBScan = async () => {
         for (let i = 0; i < this.props.global.points.length; i += 1) {
            if (!this.state.scanned.has(this.props.global.points[i].id)) {
                await this.handleSearch(this.props.global.points[i])
            }
         }
    }
    render () {
        this.handleDBScan()
        return (<></>)
        
}

}
export default connector(dbScan)