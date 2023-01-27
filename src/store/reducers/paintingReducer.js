import * as types from '../actions/index';

const initialState = {
   isAuthenticated: false,
   client: JSON.parse(localStorage.getItem('client')) || {},
};

const paintingReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.SET_AUTH:
         return {
            ...state,
            isAuthenticated: action.auth
         }
      default:
         return state;
   }
};

export default paintingReducer