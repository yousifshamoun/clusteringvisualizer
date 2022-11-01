import store from "../reduxStore";
function kMeans(): void {
    store.dispatch({type: "ADD_TO_RENDER",
     payload: <svg><g key={100}>
        <circle
        cx={600}
        cy={200}
        r={25}
        style={{ fill: 'red' }}
        stroke="grey"
        strokeWidth="0.5"/>
        </g>
        </svg>
        }
        )
}
export default kMeans