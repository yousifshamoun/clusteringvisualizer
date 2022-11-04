import store from "../reduxStore";
import { Point } from "../reduxStore/reducers/global";
import getRandomColor from "../utils/getRandomColor";
import getSquareDistance from "../utils/getSquareDistance"
import { v4 as uuidv4 } from 'uuid';
import handlePause from "../utils/handlePause"
async function kMeans() {
    /**DECLARING INSTANCE VARIABLES */
    const points: Point[] = store.getState().global.points
    const colors: string[] = []
    const delay: number = store.getState().global.delay
    let centroids = getRandomCentroids(points, 4)
    for (let i = 0; i < centroids.length; i += 1) {
        colors.push(getRandomColor())
    }
    /**DECLARING HELPER METHODS */
    function getRandomCentroids(points: Point[], k: number) : Point[] {
        if (points.length <= k) {
            return [];
        }
        const set = new Set();
        const centroids: Point[] = [];
        for (let i = 0; i < k; i++) {
        let idx = Math.floor(Math.random() * (points.length - 1))
        while (set.has(idx)) {
            idx = Math.floor(Math.random() * (points.length - 1))
        }
        set.add(idx)
        centroids.push(points[idx])
        }
        return centroids
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
            if (curDist < minDist) {
              closest = j;
              minDist = curDist
            }  
          }
          clusters[closest].push(points[i])
        }
        return clusters
      }
    const getVariance = (clusters: Point[][]) : number => {
        let variance: number = 0 
        for (let i = 0; i < clusters.length; i += 1) {
            for (let j = 0; j < clusters[i].length; j += 1) {
                variance += getSquareDistance(centroids[i], clusters[i][j])
            }
        }
        return variance
    }
    const getOptimizedCentroids = (clusters: Point[][]) : Point[] => {
        const optimizedCentroids: Point[] = []
        for (let i = 0; i < clusters.length; i += 1) {
            let X = 0 
            let Y = 0
            for (let j = 0; j < clusters[i].length; j += 1) {
                X += clusters[i][j].coordinates[0]
                Y += clusters[i][j].coordinates[1]
            }
            X /= clusters[i].length
            Y /= clusters[i].length
            optimizedCentroids.push({id: centroids[i].id, coordinates: [X,Y]})
        }
        return optimizedCentroids
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
    /** DISPATCHING TO THE STORE BEGINS HERE */
    store.dispatch({type: "START"})
    store.dispatch({type: "RESET_RENDER_PRIM"})
    store.dispatch({type: "RESET_RENDER_SEC"})
    while (true) {
        for (let i = 0; i < points.length + centroids.length; i += 1) {
            store.dispatch({type:"POP_FROM_RENDER_SEC"})
        }
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
    const clusters = getClusters(centroids, points)
    await new Promise(handlePause)
    await new Promise((res) => setTimeout(res, delay))
    store.dispatch({type: "RESET_RENDER_SEC"})
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
    for (let i = 0; i < clusters.length; i += 1) {
        for (let j = 0; j < clusters[i].length; j += 1) {
        store.dispatch({type: "ADD_TO_RENDER_SEC",
            payload: 
                <g 
                key = {uuidv4()}>
                    <line
                    x1 = {centroids[i].coordinates[0]}
                    y1 = {centroids[i].coordinates[1]}
                    x2 = {clusters[i][j].coordinates[0]}
                    y2 = {clusters[i][j].coordinates[1]}
                    stroke = {colors[i]}
                    strokeWidth="2.5"
                    />
                </g>
        })
        }
    }
    const optimizedCentroids = getOptimizedCentroids(clusters)
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
    store.dispatch({type: "STOP"})
    store.dispatch({type: "RESET_RENDER_PRIM"})
    for (let i = 0; i < points.length; i += 1) {
        store.dispatch({type: "POP_FROM_RENDER_SEC"})
    }
}
export default kMeans