// rootReducer.js

import { combineReducers } from 'redux';
import managerReducer from './managerReducer';

const rootReducer = combineReducers({
  manager: managerReducer,
});

export default rootReducer;
