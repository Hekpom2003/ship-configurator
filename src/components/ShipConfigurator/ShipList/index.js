import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { SHIP_EDIT__SET_ITEM } from '../../../constants/shipEdit';

class ShipList extends React.Component {
  render() {
    return (
      <div className={'ships-list'}>
        <div className="ships-list__header">
          <div className="ships-list__title">Список кораблей</div>
          <div className="ships-list__button">Добавить новый корабль</div>
        </div>

        <div className="ships-list__body">
          <div className="ships-list-table">
            <div className="ships-list-table__title">
              <div>id</div>
              <div>Навание судна</div>
              <div>Описание</div>
              <div>Конфигурация корабля</div>
              <div>Рейс корабля</div>
            </div>
            <div className="ships-list-table__body">
              {
                this.props.shipsList.map((item, key) =>
                  <div className="ships-list-table__row" key={key}>
                    <div>{item.id}</div>
                    <div>{item.name}</div>
                    <div>{item.description}</div>
                    <div><Link to={'/ship-configurator/edit-ship/' + key + '/'}>edit</Link></div>
                    <div>edit</div>
                  </div>
                )
              }
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateProp = state => ({
  shipsList: state.shipsList
});

const mapDispachProps = dispatch => {
  return {
    onShipEdit: ship => dispatch({ type: SHIP_EDIT__SET_ITEM, payload: ship }),

  }
};

export default connect(mapStateProp, mapDispachProps)(ShipList);