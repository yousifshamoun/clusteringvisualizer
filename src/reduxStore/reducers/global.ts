import { ReactElement } from "react"

export interface GlobalState {
    points: Point[],
    max_id: number,
    algorithm: string,
    started: boolean,
    paused: boolean,
    delay: number,
    render: ReactElement[]
}
export interface Point {
    id: number,
    coordinates: number[]
}
export const initialState: GlobalState = {
    points: [],
    max_id: 0,
    algorithm: "kmeans",
    started: false,
    paused: false,
    delay: 100,
    render: []
}
export interface Action {
    type: string,
    payload?: any
}
function global(state: GlobalState = initialState, action: Action)      {
    switch(action.type) {
        case "SET_ALGORITHM":
            return {...state, algorithm: action.payload}
        case "ADD_POINT":
            return {...state, points: [...state.points, action.payload]}
        case "APPEND_POINTS":
            return {...state, points: [...state.points, ...action.payload]}
        case "INCREMENT_MAX_ID":
            return {...state, max_id: state.max_id + 1}
        case "ADD_TO_RENDER":
            return {...state, render: [...state.render, action.payload]}
        case "APPEND_TO_RENDER":
            return {...state, render: [...state.render, ...action.payload] }
        default:
            return initialState
    }
}
export default global