import store from "../reduxStore";

const naiveRandom = async () => {
    for (let i = 0; i < 50; i += 1) {
    await new Promise((res) => setTimeout(res, 10))
    let flag:boolean = true;
    let X = 0 
    let Y = 0 
    while (flag) {
        X = Math.floor(Math.random() *(window.innerWidth - 30))
        Y = Math.floor(Math.random() * (window.innerHeight - 50))
        if (window.innerWidth - 50 <= X || window.innerHeight - 70 <= Y || 20 >= X || 20 >= Y || !X || !Y ) {
            flag = true;
        } else {
            flag = false
        }
}
store.dispatch({type: "ADD_POINT", payload: {id: store.getState().global.max_id, coordinates: [X, Y]}})
store.dispatch({type: "INCREMENT_MAX_ID"})
}
}
export default naiveRandom