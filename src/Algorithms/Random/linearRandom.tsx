import store from "../../reduxStore";

const linearRandom = async () => {
    let clusterSites: number = 4
    const sign: number = Math.random()
    const diffrence: number = Math.floor(Math.random() * 2)
    if (sign > 0.5) {
        clusterSites += diffrence
    } else {
        clusterSites -= diffrence
    }
    const xOffset: number = window.innerWidth * 0.05
    const yOffset: number = window.innerHeight * 0.3
    for (let i = 0; i < clusterSites; i += 1) {
        let flag = true
        let X = Math.floor(Math.random() * window.innerWidth)
        let Y = Math.floor(Math.random() * window.innerHeight)
        while (flag) {
            if (window.innerWidth * .97 - xOffset<= X || X <= 20 + xOffset||
            window.innerHeight * 0.87 - yOffset <= Y || Y <= 20 + yOffset) {
                X = Math.floor(Math.random() * window.innerWidth)
                Y = Math.floor(Math.random() * window.innerHeight)
            } else {
                flag = false
            }
        }
        store.dispatch({type: "ADD_POINT", payload: {id: store.getState().global.max_id, coordinates: [X, Y]}})
        store.dispatch({type: "INCREMENT_MAX_ID"})
        let positive:boolean = true
        for (let j = 0; j < 100; j += 1) {
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

store.dispatch({type: "STOP"})
}
export default linearRandom