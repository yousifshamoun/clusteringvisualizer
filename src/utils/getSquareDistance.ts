import { Point } from "../reduxStore/reducers/global";
function getSquareDistance(node: Point, cent: Point) {
    const [n1, n2] = node.coordinates;
    const [c1, c2] = cent.coordinates
    return Math.sqrt((n1.valueOf() - c1.valueOf()) ** 2 + (n2.valueOf() - c2.valueOf()) ** 2)
  }
  export default getSquareDistance