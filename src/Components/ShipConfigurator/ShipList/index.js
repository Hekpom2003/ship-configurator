import React from 'react';
import './style.scss';

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
                this.props.shipList.map( (item,key) =>
                  <div className="ships-list-table__row" key={key}>
                    <div>{item.id}</div>
                    <div>{item.name}</div>
                    <div>{item.description}</div>
                    <div onClick={()=>this.props._onEditShip(key)}>edit</div>
                    <div onClick={()=>this.props._onEditCruise(key)}>edit</div>
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

export default ShipList;