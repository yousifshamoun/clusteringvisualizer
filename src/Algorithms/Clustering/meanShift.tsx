import store from "../../reduxStore";
import { Point } from "../../reduxStore/reducers/global";
import getRandomColor from "../../utils/getRandomColor";
import getSquareDistance from "../../utils/getSquareDistance"
import { v4 as uuidv4 } from 'uuid';
import handlePause from "../../utils/handlePause";

const meanShift = async () => {
    /** Declaring instance variables */
    const points: Point[] = store.getState().global.points
    const colors: string[] = []
    const delay: number = store.getState().global.delay
    const windowSize: number = store.getState().global.windowSize
    let centroids = getInitialCentroids()
    for (let i = 0; i < centroids.length; i += 1) {
        colors.push(getRandomColor())
    }
    /** Declaring helper methods */
    function getInitialCentroids() : Point[] {
        const centroids: Point[] = []
        for (let i = 0; i < points.length; i += 1) {
            let flag: boolean = false
            for (let j = 0; j < centroids.length && !flag; j += 1) {
                /** If this point is contained within another centroids window */
                if (getSquareDistance(points[i], centroids[j]) <= windowSize) {
                    flag = true

                }
            }
            if (!flag) {
                centroids.push(points[i])
            }
        }
        return centroids
    }
    const getOptimizedCentroids = (centroids: Point[]): Point[] => {
        const optimizedCentroids: Point[] = []
        for (let i = 0; i < centroids.length; i += 1) {
            let X = 0
            let Y = 0
            let k = 0
            for (let j = 0; j < points.length; j += 1) {
                if (getSquareDistance(centroids[i], points[j]) < windowSize) {
                    k += 1
                    X += points[j].coordinates[0]
                    Y += points[j].coordinates[1]
                }
            }
            if (k) {
                optimizedCentroids.push({id: centroids[i].id, coordinates: [X / k, Y / k]})
            }
        }
        return optimizedCentroids
    }
    const mergeNearbyCentroids = (centroids: Point[]): Point[] => {
        const merged: Set<number> = new Set()
        for (let i = 0; i < centroids.length; i += 1) {
            if (merged.has(i)) {
                continue
            }
            const nearbyCentroids: number[] = []
            let X = centroids[i].coordinates[0]
            let Y = centroids[i].coordinates[1]
            for (let j = i + 1; j < centroids.length; j += 1) {
                if (35 > getSquareDistance(centroids[i], centroids[j])) {
                    nearbyCentroids.push(j)
                    merged.add(j)
                    X += centroids[j].coordinates[0]
                    Y += centroids[j].coordinates[1]
                }
            }
            X /= nearbyCentroids.length + 1
            Y /= nearbyCentroids.length + 1
            for (let k = 0; k < nearbyCentroids.length; k += 1) {
                centroids[nearbyCentroids[k]].coordinates[0] = X
                centroids[nearbyCentroids[k]].coordinates[1] = Y
            }
        }
        return centroids
    }
    const handleStoppingCondition = (oldCentroids: Point[], newCentroids: Point[]) : boolean => {
        let flag: boolean = true;
        for (let i = 0; i < oldCentroids.length; i += 1) {
            if (oldCentroids[i].coordinates[0] !== newCentroids[i].coordinates[0] || oldCentroids[i].coordinates[1] !== newCentroids[i].coordinates[1]) {
                flag = false;
            }
        }
        return flag;
    }
    const getClusters = (centroids: Point[], points: Point[]) : Point[][]  => {
        const clusters: Point[][] = []
        for (let i = 0; i < centroids.length; i += 1) {
            clusters.push([])
        } 
        for (let i = 0; i < points.length; i += 1) {
          let minDist =  Number.POSITIVE_INFINITY
          let closest = 0;
          for (let j = 0; j < centroids.length; j += 1) {
            let curDist = getSquareDistance(centroids[j], points[i])
            if (curDist <= minDist) {
              closest = j;
              minDist = curDist
            }  
          }
          clusters[closest].push(points[i])
        }
        return clusters
      }
    /** Begin Dispatching to Store */
    store.dispatch({type: "SET_ALGORITHM", payload: 'meanshift'})
    if (points.length === 0) {
        return
    }
    store.dispatch({type: "START"})
    store.dispatch({type: "RESET_RENDER_PRIM"})
    store.dispatch({type: "RESET_RENDER_SEC"})
    while (true) {
        for (let i = 0; i < centroids.length; i += 1) {
            store.dispatch({type: "POP_FROM_RENDER_SEC"})
        }
        for (let i = 0; i < centroids.length; i += 1) {
            store.dispatch({type: "ADD_TO_RENDER_PRIM", 
            payload:
                <g key = {uuidv4()}>
                <circle
                        cx={centroids[i].coordinates[0]}
                        cy={centroids[i].coordinates[1]}
                        r={windowSize}
                        fill={colors[i]}
                        opacity="0.1"
                        stroke={colors[i]}
                        strokeWidth="3"
                    />
                <rect
                    x={centroids[i].coordinates[0] - 10}
                    y={centroids[i].coordinates[1] - 10}
                    width={30}
                    height="20"
                    fill = {colors[i]}
                    strokeWidth="0.25"
                />
                <text x={centroids[i].coordinates[0] - 7} y={centroids[i].coordinates[1] + 7} style={{ fill: 'white' }}>
                    C{i + 1}
                </text>
            </g>
        })
        }
        const optimizedCentroids = getOptimizedCentroids(centroids)
        if (handleStoppingCondition(centroids, optimizedCentroids)) {
            break;
        }
        await new Promise(handlePause)
        await new Promise((res) => setTimeout(res, delay))
        for (let i = 0; i < centroids.length; i += 1) {
            store.dispatch({type: "ADD_TO_RENDER_SEC",
                payload: 
                    <g 
                    key = {uuidv4()}>
                        <line
                        x1 = {centroids[i].coordinates[0]}
                        y1 = {centroids[i].coordinates[1]}
                        x2 = {optimizedCentroids[i].coordinates[0]}
                        y2 = {optimizedCentroids[i].coordinates[1]}
                        stroke="red"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="8"
                        style={{ markerEnd: 'url(#markerArrow)'}}
                        />
                    </g>
            })
        }
        await new Promise(handlePause)
        await new Promise((res) => setTimeout(res, delay))
        store.dispatch({type: "RESET_RENDER_PRIM"})
        centroids = optimizedCentroids
    }
    store.dispatch({type: "RESET_RENDER_PRIM"})
    centroids = mergeNearbyCentroids(centroids)
    for (let i = 0; i < centroids.length; i += 1) {
        store.dispatch({type: "ADD_TO_RENDER_PRIM", 
        payload:
            <g key = {uuidv4()}>
            <rect
                x={centroids[i].coordinates[0] - 10}
                y={centroids[i].coordinates[1] - 10}
                width={30}
                height="20"
                fill = {colors[i]}
                strokeWidth="0.25"
            />
            <text x={centroids[i].coordinates[0] - 7} y={centroids[i].coordinates[1] + 7} style={{ fill: 'white' }}>
                C{i + 1}
            </text>
        </g>
    })
    }
    await new Promise(handlePause)
    await new Promise((res) => setTimeout(res, delay))
    const clusters = getClusters(centroids, points)
    for (let i = 0; i < clusters.length; i += 1) {
        for (let j = 0; j < clusters[i].length; j += 1) {
            store.dispatch({type: "ADD_TO_RENDER_SEC",
            payload: 
            <g key={uuidv4()}>
                <circle
                    cx={clusters[i][j].coordinates[0]}
                    cy={clusters[i][j].coordinates[1]}
                    r={9}
                    style={{ fill: colors[i]}}
                    stroke="black"
                    strokeWidth="1"
                />
            </g>
        })
    }}
    store.dispatch({type: "RESET_RENDER_PRIM"})
    store.dispatch({type: "STOP"})
}
export default meanShift