import { combineReducers } from 'redux';

import paintingReducer from './paintingReducer';

const rootReducer = combineReducers({
   client: paintingReducer
});

export default rootReducer;
