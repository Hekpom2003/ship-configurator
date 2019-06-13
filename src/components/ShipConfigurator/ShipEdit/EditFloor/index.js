import React from 'react';
import './style.scss';
import FloorName from './FloorName';
import FloorPlanImage from './FloorPlanImage';
import FloorGrid from './FloorGrid';
import RoomsList from './RoomsList';
import RoomInfo from './RoomInfo';
import FloorPlane from './FloorPlane/FloorPlane';

class EditFloor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      floorName: this.props.floor.name,
      floorPlanImage: "data:image/jpeg;base64,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",
      gridMatrix: this.props.floor.gridMatrix,

      gridOffset: this.props.floor.gridOffset,

      image: {
        width: 1055,
        height: 160,
      },

      rooms: this.props.floor.rooms,

      activeRoom: false,
    };

  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.table ('componentDidUpdate',{nextState,state:this.state});
  }

  render() {

    const { floorKey } = this.props;

    console.log('activeRoom', this.state.activeRoom);

    return (
      <div className="ship-floor">
        <FloorName floorKey={floorKey}
                   floorName={this.state.floorName}
                   _onChangeState={obj => this.setState(obj)}/>

        <FloorPlanImage floorKey={floorKey}
                        floorPlanImage={this.state.floorPlanImage}
                        _onChangeState={obj => this.setState(obj)}/>

        <FloorGrid floorKey={floorKey}
                   gridMatrix={this.state.gridMatrix}
                   _onChangeState={obj => this.setState(obj)}/>

        <FloorPlane {...this.state}
                    floorKey={floorKey}
                    _onChangeState={obj => this.setState(obj)}/>

        <RoomInfo room={this.state.rooms[this.state.activeRoom]}
                  id={this.state.activeRoom}
        />

        <RoomsList rooms={this.state.rooms}
                   activeRoom={this.state.activeRoom}
                   _onChangeState={obj => this.setState(obj)}/>
      </div>
    );
  }
}

export default EditFloor;