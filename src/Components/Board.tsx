import React, { ReactElement } from "react";
import { RootState } from "../reduxStore/reducers/index"
import { connect, ConnectedProps } from 'react-redux';
import {Point} from "../reduxStore/reducers/global"
const mapStateToProps = (state: RootState) => ({
    global: state.global,
}
)
const mapDispathToProps = {
    addPoint: (point: Point) => ({
        type: "ADD_POINT",
        payload: point
    }),
    incrementMaxId: () => ({
        type: "INCREMENT_MAX_ID",
    })
}
const connector = connect(mapStateToProps, mapDispathToProps)

type PropsFromRedux = ConnectedProps<typeof connector>;
type IBoardProps = PropsFromRedux & {
    component?: ReactElement
}
type BoardProps = {
    bg: React.RefObject<SVGSVGElement>;
};

class Board extends React.Component<IBoardProps, BoardProps> {
    constructor(props: IBoardProps) {
        super(props)
        this.state = {
            bg: React.createRef()
        }
    }
    handleClick = (event:  React.MouseEvent<SVGSVGElement>) => {
        // if (this.props.global.started) {
        //     return
        // }
        const target = event.target as SVGSVGElement;
        const X = event.clientX - target.getBoundingClientRect().left;
        const Y = event.clientY - target.getBoundingClientRect().top;

        if (window.innerWidth - 30 <= X || window.innerHeight - 70 <= Y || 20 >= X || 20 >= Y || !X || !Y ) {
            return
        }
        this.props.addPoint({id: this.props.global.max_id, coordinates: [X, Y]})
        this.props.incrementMaxId()
    }
    public render() {
        return (
            <div>
                 <svg
                    style={{ fill: 'red' }}
                    width="100%"
                    height="90vh"
                    ref={this.state.bg}
                    onClick={this.handleClick}>
                        {this.props.global.points.map((o: Point) => (
                        <g
                            key={o.id}
                        >
                            <circle
                                cx={o.coordinates[0]}
                                cy={o.coordinates[1]}
                                r={9}
                                style={{ fill: 'red' }}
                                stroke="black"
                                strokeWidth="1"
                            />
                        </g>
                    ))}
                    {this.props.global.render}
                    </svg>
            </div>
        )

    }
}
export default connector(Board)