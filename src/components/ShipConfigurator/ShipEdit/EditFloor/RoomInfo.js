import React from 'react';

class RoomInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { room, id } = this.props;

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
            <input type="text" id={'roomName' + id} value={room.name}/>
          </div>

          <div className="ship-floor-room-info__class-type">
            Тип каюты - {room.classType}
          </div>

          <div className="ship-floor-room-info__buttons">
            <button className="ship-floor-room-info__save">Сохранить</button>
            <button className="ship-floor-room-info__cancel">Отменить</button>
            <button className="ship-floor-room-info__delete">Удалить</button>
          </div>
        </div>
      );
    }


  }
}

export default RoomInfo;
