import {Point} from "../../reduxStore/reducers/global"
import getSquareDistance from "../../utils/getSquareDistance";
import getRandomColor from "../../utils/getRandomColor";
import {v4 as uuidv4 } from "uuid"
import store from "../../reduxStore";
import handlePause from "../../utils/handlePause";

async function dbScan () {
    const scanned: Set<number> = new Set()
    const color: string[] = []
    const global = store.getState().global
    const handleSearch = async (inititalPoint: Point) => {
        let q: Point[] = [inititalPoint]
        let firstToBeColored: boolean = true 
        while (q.length) {
            const point = q[0]
            q.shift()
            let cur: Point[] = []
            for (let i = 0; i < global.points.length; i += 1) {
                if (point?.id === global.points[i].id) {
                    continue
                }
                if (global.eps >= getSquareDistance(point, global.points[i]) && !scanned.has(global.points[i].id)) {
                    cur.unshift(global.points[i])
                }
            }
            if (cur.length + 1 >= global.minPoints) {
                q = [...q, ...cur]
                if (firstToBeColored) {
                    firstToBeColored = false
                    color.push(getRandomColor())
                    scanned.add(point.id)
                    store.dispatch({ type: "ADD_TO_RENDER_PRIM", payload:
                        <g key = {uuidv4()}>
                            <circle
                                r={9}
                                cx={point.coordinates[0]}
                                cy={point.coordinates[1]}
                                fill = {color[color.length - 1]}
                                stroke="black"
                                strokeWidth="0.5"
                                />
                        </g>
                    })
                }
                store.dispatch({ type: "ADD_TO_RENDER_SEC", payload:
                    <g key = {uuidv4()}>
                        <circle
                            r = {global.eps}
                            cx={point.coordinates[0]}
                            cy={point.coordinates[1]}
                            stroke = {color[color.length - 1]}
                            strokeWidth="3"
                            fill="transparent"/>
                    </g>
            })
                store.dispatch({ type: "ADD_TO_RENDER_SEC", payload:
                    <g key = {uuidv4()}>
                        <circle
                            r = {global.eps}
                            cx = {point.coordinates[0]}
                            cy = {point.coordinates[1]}
                            opacity="0.06"
                            stroke = {color[color.length - 1]}
                            strokeWidth="3"
                            fill = {color[color.length - 1]}
                            />
                    </g>
            })
                for (let i = 0; i < cur.length; i += 1) {
                    scanned.add(cur[i].id)
                    store.dispatch({ type: "ADD_TO_RENDER_PRIM", payload:
                        <g key = {uuidv4()}>
                            <circle
                                r={9}
                                cx={cur[i].coordinates[0]}
                                cy={cur[i].coordinates[1]}
                                fill = {color[color.length - 1]}
                                stroke="black"
                                strokeWidth="0.5" />

                        </g>
                })
                }
            }
            await new Promise(handlePause)
            await new Promise((res) => setTimeout(res, global.delay * 0.10))
        }
    }
store.dispatch({type: "START"})
store.dispatch({type: "RESET_RENDER_PRIM"})
store.dispatch({type: "RESET_RENDER_SEC"})
for (let i = 0; i < global.points.length; i += 1) {
    if (!scanned.has(global.points[i].id)) {
        await handleSearch(global.points[i])
    }
}
store.dispatch({type: "RESET_RENDER_SEC"})
store.dispatch({type: "STOP"})
}
export default dbScan