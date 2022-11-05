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
    const windowSize: number = 100
    let centroids = getInitialCentroids()
    /** Declaring helper methods */
    function getInitialCentroids() : Point[] {
        const centroids: Point[] = []
        let flag: boolean = false
        for (let i = 0; i < points.length; i += 1) {
            for (let j = 0; j < centroids.length; j += 1) {
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
    /** Begin Dispatching to Store */
    store.dispatch({type: "START"})
    store.dispatch({type: "RESET_RENDER_PRIM"})
    store.dispatch({type: "RESET_RENDER_SEC"})
    while (true) {
        
    }
}
export default meanShift