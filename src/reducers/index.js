import { combineReducers } from 'redux';
import shipsList from './shipsList';
import shipEdit from './shipEdit';
import authentication from './authentication';


export const reducer = combineReducers({
  shipsList,
  shipEdit,
  authentication,
});