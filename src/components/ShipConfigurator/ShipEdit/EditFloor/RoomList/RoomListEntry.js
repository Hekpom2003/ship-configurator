import React from "react";

class RoomListEntry extends React.Component {
	
	setState(state, callback) {
		// super.setState(state, callback);
		this.props.onChange(this.props.theKey, {...this.state, ...state});
	}
	
	render() {
		let _class = 'room-list__room';
		if (this.props.selected)
			_class += ' selected';
		
		return (
			<div className={_class} onClick={e => this.props.onSelect(this.props.theKey)}>
				<div className="room-list__room-name">
					Название:
					<input type="text" value={this.props.name} onChange={e => this.setState({name: e.target.value})}/>
				</div>
				<div>
					<label>
						<input type="checkbox" checked={this.props.service}
						       onChange={e => this.setState({service: e.target.checked})}/> Служебная
					</label>
				</div>
				<div>
					<select>
						<option value={false}>(Выберите класс)</option>
					</select>
				</div>
				<div>
					<button>Указать расположение</button>
				</div>
			</div>
		)
	}
}

export default RoomListEntry;