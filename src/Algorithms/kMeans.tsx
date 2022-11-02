import store from "../reduxStore";
import { Point } from "../reduxStore/reducers/global";
import getRandomColor from "../utils/getRandomColor";
import getSquareDistance from "../utils/getSquareDistance"
function kMeans(): void {
    const points: Point[] = store.getState().global.points
    const colors: string[] = []
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

    const centroids = getRandomCentroids(points, 2)
    for (let i = 0; i < centroids.length; i += 1) {
        colors.push(getRandomColor())
    }
const clusters = getClusters(centroids, points)
for (let i = 0; i < clusters.length; i += 1) {
    for (let j = 0; j < clusters[i].length; j += 1) {
        store.dispatch({type: "ADD_TO_RENDER",
        payload: 
        <g key={j.toString() + i.toString()}>
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
    }
}
for (let i = 0; i < centroids.length; i += 1) {
    store.dispatch({type: "ADD_TO_RENDER",
    payload: 
    <g key = {centroids[i].id}>
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
    })}
}
export default kMeans