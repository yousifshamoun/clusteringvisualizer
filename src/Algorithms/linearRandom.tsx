import store from "../reduxStore";

const linearRandom = async () => {
    const clusterSites: number = 4
    const xOffset: number = 60  
    const yOffset: number = 200
    for (let i = 0; i < clusterSites; i += 1) {
        let flag = true
        let X = Math.floor(Math.random() * window.innerWidth)
        let Y = Math.floor(Math.random() * window.innerHeight)
        while (flag) {
            if (X > (window.innerWidth * 0.7) || X < (window.innerWidth * 0.3) ||
            Y > (window.innerHeight * 0.7) || Y < (window.innerHeight * 0.3)) {
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
            await new Promise((res) => setTimeout(res, 10))
            let cX = X
            let cY = Y
            if (positive) {
                cX += Math.floor(Math.random() * xOffset)
                cY += Math.floor(Math.random() * yOffset)
            } else {
                cX -= Math.floor(Math.random() * xOffset)
                cY -= Math.floor(Math.random() * yOffset)
            }
            store.dispatch({type: "ADD_POINT", payload: {id: store.getState().global.max_id, coordinates: [cX, cY]}})
            store.dispatch({type: "INCREMENT_MAX_ID"})
            positive = !positive
            
        }
    }


}
export default linearRandom