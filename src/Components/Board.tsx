import React, { ReactElement } from "react";
import { RootState } from "../reduxStore/reducers/index";
import { connect, ConnectedProps } from "react-redux";
import { Point } from "../reduxStore/reducers/global";
const mapStateToProps = (state: RootState) => ({
    global: state.global,
});
const mapDispatchToProps = {
    addPoint: (point: Point) => ({
        type: "ADD_POINT",
        payload: point,
    }),
    incrementMaxId: () => ({
        type: "INCREMENT_MAX_ID",
    }),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type IBoardProps = PropsFromRedux & {
    component?: ReactElement;
};
type BoardProps = {
    bg: React.RefObject<SVGSVGElement>;
};

class Board extends React.Component<IBoardProps, BoardProps> {
    constructor(props: IBoardProps) {
        super(props);
        this.state = {
            bg: React.createRef(),
        };
    }
    handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        const target = event.target as SVGSVGElement;
        const X = event.clientX - target.getBoundingClientRect().left;
        const Y = event.clientY - target.getBoundingClientRect().top;

        if (
            this.props.global.started ||
            window.innerWidth * 0.97 <= X ||
            window.innerHeight * 0.87 <= Y ||
            20 >= X ||
            20 >= Y ||
            !X ||
            !Y
        ) {
            return;
        }
        this.props.addPoint({
            id: this.props.global.max_id,
            coordinates: [X, Y],
        });
        this.props.incrementMaxId();
    };
    public render() {
        return (
            <div>
                <svg
                    fill="current"
                    width="100%"
                    height="90vh"
                    ref={this.state.bg}
                    onClick={this.handleClick}
                >
                    <defs>
                        <marker
                            id="markerArrow"
                            markerWidth="20"
                            markerHeight="20"
                            refX="10"
                            refY="6"
                            orient="auto"
                        >
                            <path d="M2,2 L2,11 L10,6 L2,2" fill="red" />
                        </marker>
                    </defs>
                    {this.props.global.points.map((o: Point) => (
                        <g key={o.id}>
                            <circle
                                cx={o.coordinates[0]}
                                cy={o.coordinates[1]}
                                r={9}
                                style={{ fill: "red" }}
                                stroke="black"
                                strokeWidth="1"
                            />
                        </g>
                    ))}
                    {this.props.global.render_primary}
                    {this.props.global.render_secondary}
                </svg>
            </div>
        );
    }
}
export default connector(Board);
