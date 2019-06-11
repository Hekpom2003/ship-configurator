import React from 'react';
import EditFloor from './EditFloor';
import './style.scss';
import { connect } from 'react-redux';
import { SHIP_EDIT__SET_ITEM } from '../../../constants/shipEdit';
import Preloader from '../../Preloader';
import ShipEditComponent from './ShipEditComponent';


class ShipEdit extends React.Component {

  componentDidMount() {
    const shipId = this.props.match.params.shipId || false;

    this.props._setDataFromServer(this.props.shipsList[shipId]);
  }

  render() {

    if (Object.keys(this.props.shipEdit).length === 0) {
      return (
        <Preloader/>
      )
    } else {
      return (
        <ShipEditComponent/>
      )
    }
  }
}

const mapStateProp = state => ({
  shipEdit: state.shipEdit,
  shipsList: state.shipsList,
});

const mapDispachProps = dispatch => {
  return {
    _setDataFromServer: data => dispatch({ type: SHIP_EDIT__SET_ITEM, payload: data }),

  }
};

export default connect(mapStateProp, mapDispachProps)(ShipEdit);