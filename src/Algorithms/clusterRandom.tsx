import store from "../reduxStore";

const clusterRandom = () => {
    const clusterSites: number = 4
    const clusterRadius: number = 100
    for (let i = 0; i < clusterSites; i += 1) {
        let flag = true
        let X = Math.floor(Math.random() * window.innerWidth)
        let Y = Math.floor(Math.random() * window.innerHeight)
        while (flag) {
            if (X > (window.innerWidth * 0.8) || X < (window.innerWidth * 0.2) ||
            Y > (window.innerHeight * 0.8) || Y < (window.innerHeight * 0.2)) {
                X = Math.floor(Math.random() * window.innerWidth)
                Y = Math.floor(Math.random() * window.innerHeight)
            } else {
                flag = false
            }
        }
        store.dispatch({type: "ADD_POINT", payload: {id: store.getState().global.max_id, coordinates: [X, Y]}})
        store.dispatch({type: "INCREMENT_MAX_ID"})
        let positive:boolean = true
        for (let j = 0; j < 25; j += 1) {
            let cX = X
            let cY = Y
            if (positive) {
                cX += Math.floor(Math.random() * clusterRadius)
                cY += Math.floor(Math.random() * clusterRadius)
            } else {
                cX -= Math.floor(Math.random() * clusterRadius)
                cY -= Math.floor(Math.random() * clusterRadius)
            }
            store.dispatch({type: "ADD_POINT", payload: {id: store.getState().global.max_id, coordinates: [cX, cY]}})
            store.dispatch({type: "INCREMENT_MAX_ID"})
            positive = !positive
            
        }
    }


}
export default clusterRandom