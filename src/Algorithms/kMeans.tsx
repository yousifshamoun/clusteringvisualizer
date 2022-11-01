import store from "../reduxStore";
function kMeans(): void {
    store.dispatch({type: "ADD_TO_RENDER",
     payload: <svg key={100}><g key={101}>
        <circle
        key={102}
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