// reducer.js
import { SET_MANAGER_ID, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE } from './actionTypes';

const initialState = {
  managerId: null,
  userData: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MANAGER_ID:
      return {
        ...state,
        managerId: action.payload,
      };
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null, 
      };
    case FETCH_USER_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
