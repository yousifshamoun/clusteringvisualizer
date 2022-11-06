import store from "../../reduxStore";

const circluarRandom = async () => {
    const singleCircle = async (initialRadius: number) => {
        let oX = window.innerWidth / 2 - 50 
        let oY = window.innerHeight / 2 
        let X = oX + initialRadius 
        let Y = oY
        for (let i = 0; i < 100; i += 1) {
        await new Promise((res) => setTimeout(res, 10))
        const sign = Math.random() * 30
        store.dispatch({type: "ADD_POINT", payload: {id: store.getState().global.max_id, coordinates: [X + sign, Y + sign]}})
        store.dispatch({type: "INCREMENT_MAX_ID"})
        store.dispatch({type: "ADD_POINT", payload: {id: store.getState().global.max_id, coordinates: [Y + (oX / 2) + sign, X - oY + sign]}})
        store.dispatch({type: "INCREMENT_MAX_ID"})
        if (0 <= i  && i < 25) {
            X -= initialRadius / 25
            Y = oY - Math.sqrt((initialRadius ** 2) - ((X- oX) ** 2))
        } else if (25 <= i && i < 50) {
            X -= initialRadius / 25
            Y = oY - Math.sqrt((initialRadius ** 2) - ((X- oX) ** 2))
        } else if (50 >= i && i < 75) {
            X += initialRadius / 25
            Y = oY + Math.sqrt((initialRadius ** 2) - ((X- oX) ** 2))
        } else {
            X += initialRadius / 25
            Y = oY + Math.sqrt((initialRadius ** 2) - ((X- oX) ** 2))
        }
    }
}
const initialRadius: number = 100
for (let i = 0; i < 3; i += 1) {
    // const skip = Math.random()
    // if (skip > 0.5) {
    //     continue
    // }
    singleCircle(initialRadius + (100*i))
}

}
export default circluarRandom