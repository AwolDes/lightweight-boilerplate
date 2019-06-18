
import { combineReducers } from 'redux';
import { Auth as auth } from '../common/reducers';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
