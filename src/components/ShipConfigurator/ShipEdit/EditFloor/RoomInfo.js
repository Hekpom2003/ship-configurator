import React from 'react';

class RoomInfo extends React.Component {

  constructor(props) {
    super(props);

    /** пришлось пока сделать uncontrolled элементы у этого блока, надо разобраться и рефакторнуть в controlled*/
    this.roomName = React.createRef();
    this.classType = React.createRef();

    this._saveRoom = this._saveRoom.bind(this);
    this._deleteRoom = this._deleteRoom.bind(this);
  }

  _saveRoom() {

    const id = this.props.id;

    const room = {
      id: this.props.room.id,
      name: this.roomName.current.value,
      roomClass: this.classType.current.value
    };

    this.props._saveRoom(id,room);
  }

  _deleteRoom() {
    this.props._deleteRoom(this.props.id);
  }


  render() {

    const { room, id } = this.props;

    const classType = [
      { name: 'Служебное помещение', code: 'serviceSpace' },
      { name: 'Класс1', code: 'class1' },
      { name: 'Класс2', code: 'class2' },
      { name: 'Класс3', code: 'class3' },
    ];

    if (room === undefined) {
      return (
        <div className="ship-floor__room-info">
          Каюта не выбрана
        </div>
      );
    } else {

      return (
        <div className="ship-floor__room-info ship-floor-room-info">
          <div className="ship-floor-room-info__title">
            Информация по выбранной каюте:
          </div>

          <div className="ship-floor-room-info__name">
            <label htmlFor={"roomName" + id}>Название каюты</label>
            <input type="text" id={'roomName' + id} defaultValue={room.name} ref={this.roomName}/>
          </div>

          <div className="ship-floor-room-info__class-type">
            <label htmlFor={"classType" + id}>Класс каюты</label>
            <select name={"classType" + id} id={"classType" + id} ref={this.classType} defaultValue={this.props.room.roomClass}>
              {
                classType.map((item) => {
                    return <option key={item.code} value={item.code} >{item.name}</option>
                  }
                )
              }
            </select>
          </div>

          <div className="ship-floor-room-info__buttons">
            <button className="ship-floor-room-info__save"
                    onClick={this._saveRoom}>Сохранить
            </button>
            <button className="ship-floor-room-info__cancel"
                    onClick={() => this.props._onChangeState({ activeRoom: false })}>Отменить
            </button>
            <button className="ship-floor-room-info__delete"
                    onClick={this._deleteRoom}>Удалить
            </button>
          </div>
        </div>
      );
    }


  }
}

export default RoomInfo;
