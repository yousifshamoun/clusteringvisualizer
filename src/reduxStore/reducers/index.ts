import { combineReducers } from 'redux';
import global,  {GlobalState} from './global';
import algorithm, {algorithmState} from './algorithm';
const rootReducer = combineReducers({
    global: global,
    algorithm: algorithm
  })
export interface RootState {
    global: GlobalState,
    algorithm: algorithmState
}
export default rootReducer