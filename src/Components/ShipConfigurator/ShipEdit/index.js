import React from 'react';
import EditFloor from './EditFloor';
import './style.scss';


class ShipEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shipName: this.props.ship.name,
      shipDescription: this.props.ship.description,
    }
  }


  render() {

    const { ship } = this.props;

    // console.log('ShipEdit', ship);

    return (
      <div className={'ship-edit'}>
        <div className="ship-edit__header">
          <div className="ship-edit__title">Редактирование корабля</div>

        </div>
        <div className="ship-edit__body">

          <div className="ship-edit__name">
            <label htmlFor="shipName">Название корабля</label>
            <input type="text"
                   value={this.state.shipName}
                   onChange={e => this.setState({ shipName: e.target.value })}/>
          </div>

          <div className="ship-edit__description">
            <label htmlFor="shipDescription">Описание корабля</label>
            <textarea name="shipDescription"
                      id="shipDescription"
                      cols="30"
                      rows="10"
                      onChange={e => this.setState({ shipDescription: e.target.value })}
                      value={this.state.shipDescription}
            />
          </div>

          <div className="ship-edit__floors">
            {
              ship.floors.map(item => <EditFloor key={item.id} {...item}/>)
            }
          </div>

        </div>
        <div className="ship-edit__footer">
          <div className="ship-edit__save">Сохранить</div>
          <div className="ship-edit__cancel" onClick={() => this.props._cancelEdit()}>Отмена</div>
        </div>


      </div>
    );
  }
}

export default ShipEdit;