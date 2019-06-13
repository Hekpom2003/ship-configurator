import React from 'react';

class DrawGridElement extends React.Component {
  render() {

    const { tiles, rowKey, colKey, room, isActiveRoom } = this.props;

    const path = 'M0,0 H' + tiles.width + " V" + tiles.height + "H0 L0,0";

    const translate = (colKey * tiles.width) + ',' + (rowKey * tiles.height);

    const roomClass = 'room-class--' + ((room === undefined) ? 'empty-ceil' : room.roomClass);


    return (
      <g transform={"translate(" + translate + ")"} className={roomClass + ' ' + isActiveRoom}>
        <path d={path}/>
      </g>
    );
  }
}

export default DrawGridElement;