import store from "../../reduxStore";

const clusterRandom = async () => {
    let clusterSites: number = 5
    const sign: number = Math.random()
    const diffrence: number = Math.floor(Math.random() * 3)
    if (sign > 0.5) {
        clusterSites += diffrence
    } else {
        clusterSites -= diffrence
    }
    const clusterRadius: number = 100
    for (let i = 0; i < clusterSites; i += 1) {
        let flag = true
        let X = Math.floor(Math.random() * window.innerWidth)
        let Y = Math.floor(Math.random() * window.innerHeight)
        while (flag) {
            if (window.innerWidth * .97 - clusterRadius<= X || X <= 20 + clusterRadius ||
            window.innerHeight * 0.87 - clusterRadius <= Y || Y <= 20 + clusterRadius) {
                X = Math.floor(Math.random() * window.innerWidth)
                Y = Math.floor(Math.random() * window.innerHeight)
            } else {
                flag = false
            }
        }
        store.dispatch({type: "ADD_POINT", payload: {id: store.getState().global.max_id, coordinates: [X, Y]}})
        store.dispatch({type: "INCREMENT_MAX_ID"})
        let positive:boolean = true
        for (let j = 0; j < 50; j += 1) {
            await new Promise((res) => setTimeout(res, 10))
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
            // positive = !positive
            
        }
    }

store.dispatch({type: "STOP"})
}
export default clusterRandom