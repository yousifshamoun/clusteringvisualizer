import { ReactElement } from "react"

export interface GlobalState {
    points: Point[],
    max_id: number,
    algorithm: string,
    k: number,
    windowSize: number,
    eps: number,
    minPoints: number,
    started: boolean,
    paused: boolean,
    delay: number,
    render_primary: ReactElement[]
    render_secondary: ReactElement[]
}
export interface Point {
    id: number,
    coordinates: number[]
}
export const initialState: GlobalState = {
    points: [],
    max_id: 0,
    algorithm: "",
    k: 2,
    windowSize: 120,
    eps: 35,
    minPoints: 2,
    started: false,
    paused: false,
    delay: 100,
    render_primary: [],
    render_secondary: []
}
export interface Action {
    type: string,
    payload?: any
}
function global(state: GlobalState = initialState, action: Action) {
    switch(action.type) {
        case "SET_ALGORITHM":
            return {...state, algorithm: action.payload}
        case "START":
            return {...state, started: true}
        case "STOP":
            return {...state, started: false}
        case "ADD_POINT":
            return {...state, points: [...state.points, action.payload]}
        case "APPEND_POINTS":
            return {...state, points: [...state.points, ...action.payload]}
        case "INCREMENT_MAX_ID":
            return {...state, max_id: state.max_id + 1}
        case "ADD_TO_RENDER_PRIM":
            return {...state,render_secondary: [...state.render_secondary, action.payload]}
        case "ADD_TO_RENDER_SEC":
            return {...state,  render_primary: [...state.render_primary, action.payload]}
        case "RESET_RENDER_PRIM":
            return {...state, render_secondary: []}
        case "RESET_RENDER_SEC":
            return {...state, render_primary: []}
        case "POP_FROM_RENDER_SEC":
            state.render_primary.pop()
            return {...state, render_primary: state.render_primary}
        case "PAUSE":
            return {...state, paused: true}
        case "RESUME":
            return {...state, paused: false}
        case "SET_DELAY":
            return {...state, delay: action.payload}
        case "CHANGE_NUMBER_OF_CENTROIDS":
            return {...state, k: action.payload}
        case "CHANGE_WINDOW_SIZE":
            return {...state, windowSize: action.payload}
        case "CHANGE_EPSILON":
            return {...state, eps: action.payload}
        case "CHANGE_MIN_POINTS":
            return {...state, minPoints: action.payload}
        case "RESET":
            return initialState
        default:
            return initialState
    }
}
export default global