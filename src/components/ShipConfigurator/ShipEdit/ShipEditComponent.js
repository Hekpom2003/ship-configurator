import React from 'react';
import {
  SHIP_EDIT__SET_ITEM,
  SHIP_EDIT__SET_SHIP_NAME,
  SHIP_EDIT__SET_SHIP_DESCRIPTION
} from '../../../constants/shipEdit';
import { connect } from 'react-redux';
import EditFloor from './EditFloor';

class ShipEditComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shipName: this.props.shipName,
      shipDescription: this.props.shipDescription,
    };

    this.onChangeShipName = this.onChangeShipName.bind(this);
    this.onChangeShipDescription = this.onChangeShipDescription.bind(this);
  }

  onChangeShipName(shipName) {
    this.props._setShipName(shipName);
    this.setState({ shipName });
  }

  onChangeShipDescription(shipDescription) {
    this.props._setShipDescription(shipDescription);
    this.setState({ shipDescription });
  }


  render() {

    return (
      <div className="ship-edit">
        <div className="ship-edit__header">
          <div className="ship-edit__title">Редактирование корабля</div>
        </div>
        <div className="ship-edit__body">
          <div className="ship-edit__name">
            <label htmlFor="shipName">Название корабля</label>
            <input type="text"
                   value={this.state.shipName}
                   onChange={e => this.onChangeShipName(e.target.value)}/>
          </div>

          <div className="ship-edit__description">
            <label htmlFor="shipDescription">Описание корабля</label>
            <textarea name="shipDescription"
                      id="shipDescription"
                      cols="30"
                      rows="10"
                      onChange={e => this.onChangeShipDescription(e.target.value)}
                      value={this.state.shipDescription}
            />
          </div>

          <div className="ship-edit__floors">
            {
              this.props.shipFloors.map(
                (item, key) => <EditFloor key={item.id}
                                          floor={item}
                                          floorKey={key}/>
              )
            }
          </div>

        </div>
      </div>
    );
  }
}


const mapStateProp = state => ({
  shipName: state.shipEdit.name,
  shipDescription: state.shipEdit.description,
  shipFloors: state.shipEdit.floors,
});

const mapDispachProps = dispatch => {
  return {
    _setDataFromServer: data => dispatch({ type: SHIP_EDIT__SET_ITEM, payload: data }),
    _setShipName: shipName => dispatch({ type: SHIP_EDIT__SET_SHIP_NAME, payload: shipName }),
    _setShipDescription: shipDescription => dispatch({
      type: SHIP_EDIT__SET_SHIP_DESCRIPTION,
      payload: shipDescription
    }),

  }
};

export default connect(mapStateProp, mapDispachProps)(ShipEditComponent);