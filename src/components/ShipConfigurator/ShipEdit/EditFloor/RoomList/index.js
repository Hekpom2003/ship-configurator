import React from "react";
import RoomListEntry from "./RoomListEntry";
import './style.scss';

class RoomList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			rooms: this.props.rooms,
			selectedRoom: 0
		};
		
		this._changeRoom = this._changeRoom.bind(this);
		this._dropSelectedRoom = this._dropSelectedRoom.bind(this);
		this._addNewRoom = this._addNewRoom.bind(this);
	}
	
	_changeRoom(idx, state) {
		let newRooms = this.state.rooms;
		newRooms[idx] = state;
		this.setState({rooms: newRooms});
	}
	
	_dropSelectedRoom() {
		let {selectedRoom} = this.state;
		if (selectedRoom > (this.state.rooms.length - 1)) {
			selectedRoom = (this.state.rooms.length - 1);
		}
		
		this.state.rooms.splice(selectedRoom, 1);
		this.setState({
			rooms: this.state.rooms,
			selectedRoom
		});
	}
	
	_addNewRoom() {
		let {rooms} = this.state;
		
		rooms.push({
			id: false,
			name: 'Комната ' + rooms.length,
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			service: false,
			roomClass: false
		});
		
		this.setState({
			rooms,
			selectedRoom: rooms.length - 1
		});
	}
	
	tileStates = {};
	statTO = false;
	
	render() {
		let roomList = [];
		this.tileStates = {};
		
		for (let rum in this.state.rooms) {
			const room = this.state.rooms[rum];
			let tilesStatus = 'busy';
			if (parseInt(rum) === parseInt(this.state.selectedRoom)) {
				tilesStatus = 'selected';
			}
			
			if (room.x > 0 && room.y > 0 && room.width > 0 && room.height > 0) {
				for (let x = room.x; x <= room.x + room.width; x++) {
					for (let y = room.y; y <= room.y + room.height; y++) {
						this.tileStates[x + ',' + y] = tilesStatus;
					}
				}
			}
			
			roomList.push(
				<RoomListEntry
					key={rum}
					theKey={rum}
					onSelect={rnum => this.setState({selectedRoom: rnum})}
					onChange={this._changeRoom}
					selected={parseInt(rum) === parseInt(this.state.selectedRoom)}
					{...room}
				/>
			);
			
			// Had infinite loop problems.
			if (this.statTO) {
				clearTimeout(this.statTO);
			}
			this.statTO = setTimeout(() => {
				this.props.onTileStatusChanged(this.tileStates);
				this.statTO = false;
			}, 1);
			
		}
		
		return (
			<div className="room-list">
				<div className="room-list__controls">
					<button onClick={this._addNewRoom}>Добавить</button>
					<button onClick={this._dropSelectedRoom}>Удалить</button>
				</div>
				<div className="room-list__cont">
					{roomList}
				</div>
			</div>
		)
	}
}

export default RoomList;