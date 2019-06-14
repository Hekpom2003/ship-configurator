import {
  SHIP_EDIT__ADD_FLOOR,
  SHIP_EDIT__CLEAR,
  SHIP_EDIT__SET_ITEM, SHIP_EDIT__SET_SHIP_DESCRIPTION,
  SHIP_EDIT__SET_SHIP_NAME
} from '../constants/shipEdit';

const initialState = {};

export default function shipEdit(state = initialState, action) {
  switch (action.type) {
    case SHIP_EDIT__SET_ITEM:
      return { ...action.payload };
    case SHIP_EDIT__SET_SHIP_NAME:
      return { ...state, name: action.payload };
    case SHIP_EDIT__SET_SHIP_DESCRIPTION:
      return { ...state, description: action.payload };
    case SHIP_EDIT__ADD_FLOOR:
      return { ...state, floors: action.payload };
    case SHIP_EDIT__CLEAR:
      return {};
    default:
      return state;
  }

}