import { combineReducers } from 'redux';
import global,  {GlobalState} from './global';
const rootReducer = combineReducers({
    global: global,

  })
export interface RootState {
    global: GlobalState,

}
export default rootReducer