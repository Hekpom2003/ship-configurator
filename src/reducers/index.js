import { combineReducers } from 'redux';
import shipsList from './shipsList';
import shipEdit from './shipEdit';


export const reducer = combineReducers({
  shipsList,
  shipEdit
});