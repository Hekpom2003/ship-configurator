import React from 'react';

class RoomsList extends React.Component {
  render() {

    let roomsList = [];

    for (let roomId in this.props.rooms) {
      const item = this.props.rooms[roomId];

      const isActive = (this.props.activeRoom === +roomId) ? 'is-active' : '';

      roomsList.push(
        <button className={"ship-floor-rooms-list__item " + isActive}
                key={item.id}
                onClick={() => this.props._onChangeState({ activeRoom: (isActive) ? false : roomId })}
        >{item.name}</button>);
    }


    return (
      <div className="ship-floor__rooms-list ship-floor-rooms-list">
        {roomsList}
        <button className="ship-floor-rooms-list__item">Добавить каюту</button>
      </div>
    );
  }
}

export default RoomsList;