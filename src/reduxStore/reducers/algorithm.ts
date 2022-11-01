import { ReactElement } from "react";
import { Action } from "./global";
export interface algorithmState {
    render: ReactElement[],
}
const inititalAlgorithmState: algorithmState = {
    render: []
}
function algorithm(state: algorithmState = inititalAlgorithmState, action: Action) {
    switch(action.type) {
        case "ADD_TO_RENDER":
            return {...state, render: [...state.render, action.payload]}
        case "APPEND_TO_RENDER":
            return {...state, render: [...state.render, ...action.payload] }
        default:
            return state
    }
    
}
export default algorithm