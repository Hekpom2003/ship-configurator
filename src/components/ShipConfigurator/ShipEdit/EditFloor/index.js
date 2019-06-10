import React from 'react';
import './style.scss';
import CounterInput from "./CounterInput";
import FloorGrid from "./FloorGrid";
import RoomList from "./RoomList";

class EditFloor extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			floorName: this.props.name,
			floorPlanImage: this.props.planImage,
			rows: this.props.rows,
			cols: this.props.cols,
			gridWidth: 0, // updated by onload
			gridHeight: 0, // updated by onload
			offset: {
				top: this.props.offset.top,
				left: this.props.offset.left,
				right: this.props.offset.right,
				bottom: this.props.offset.bottom
			},
			tileStatuses: {},
			
			rooms: this.props.rooms
		};
		
		this._readFile = this._readFile.bind(this);
		this._drawFloorPlan = this._drawFloorPlan.bind(this);
		this._drawBackgroundImage = this._drawBackgroundImage.bind(this);
		this._drawGrid = this._drawGrid.bind(this);
		this._setOffsetState = this._setOffsetState.bind(this);
	}
	
	_readFile(file) {
		const reader = new FileReader();
		reader.onloadend = e => this.setState({floorPlanImage: e.target.result});
		reader.readAsDataURL(file);
	}
	
	_setOffsetState(newState) {
		let {offset} = this.state;
		
		if (newState.offset.top !== void 0)
			offset.top = newState.offset.top;
		
		if (newState.offset.left !== void 0)
			offset.left = newState.offset.left;
		
		if (newState.offset.right !== void 0)
			offset.right = newState.offset.right;
		
		if (newState.offset.bottom !== void 0)
			offset.bottom = newState.offset.bottom;
		
		this.setState({offset});
	}
	
	_drawFloorPlan() {
		return (
			<div className="floor-grid-options">
				<div>
					<div>
						<span>Отступ сверху:</span>
						<CounterInput value={this.state.offset.top}
						              onChange={(val) => this._setOffsetState({offset: {top: val}})}/>
					</div>
					<div className="floor-grid-options__central-floor">
						<div>
							<CounterInput value={this.state.offset.left}
							              onChange={(val) => this._setOffsetState({offset: {left: val}})}/>
						</div>
						{this._drawGridContainer()}
						<div>
							<CounterInput value={this.state.offset.right}
							              onChange={(val) => this._setOffsetState({offset: {right: val}})}/>
						</div>
						{this._drawRoomsList()}
					</div>
					<div>
						<span>Отступ снизу</span>
						<CounterInput value={this.state.offset.bottom}
						              onChange={(val) => this._setOffsetState({offset: {bottom: val}})}/>
					</div>
				</div>
			</div>
		);
	}
	
	_drawRoomsList() {
		//TODO: add click proxy!
		return (
			<div>
				<RoomList
					rooms={this.state.rooms}
					onUpdateList={newList => this.setState({rooms: newList})}
					onTileStatusChanged={(tileStatuses) => {
						this.setState({tileStatuses});
					}}
				/>
			</div>
		)
	}
	
	_drawGridContainer() {
		return <div className={"floor-grid"}>
			{this._drawBackgroundImage()}
			{this._drawGrid()}
		</div>
	}
	
	_drawGrid() {
		return <FloorGrid
			rows={this.state.rows}
			cols={this.state.cols}
			offset={this.state.offset}
			imgWidth={this.state.gridWidth}
			imgHeight={this.state.gridHeight}
			tileStatus={this.state.tileStatuses}
		/>
	}
	
	_drawBackgroundImage() {
		
		return <div>
			<img src={this.state.floorPlanImage}
			     alt="План палубы"
			     onLoad={e => this.setState({
				     gridWidth: e.target.width,
				     gridHeight: e.target.height
			     })}
			/>
		</div>
		
	}
	
	render() {
		const {id} = this.props;
		
		const floorPlan = (this.state.floorPlanImage) ? this._drawFloorPlan() : 'нет плана';
		
		return (
			<div className="edit-ship-floor">
				{/*Название палубы*/}
				<div className="edit-ship-floor__name">
					<label htmlFor={"floorName" + id}>Название палубы</label>
					<input type="text"
					       id={"floorName" + id}
					       value={this.state.floorName}
					       onChange={e => this.setState({floorName: e.target.value})}/>
				</div>
				<div className="edit-ship-floor__background-map">
					<label htmlFor={"floorPlanImage" + id}>Загрузите план палубы</label>
					<input type="file"
					       id={"floorPlanImage" + id}
					       onChange={e => this._readFile(e.target.files[0])}/>
				</div>
				
				<div className="edit-ship-floor__rowscols">
					<div>
						<span>Столбцов: </span>
						<CounterInput value={this.state.cols} onChange={(val) => this.setState({cols: val})}/>
					</div>
					<div>
						<span>Строк: </span>
						<CounterInput value={this.state.rows} onChange={(val) => this.setState({rows: val})}/>
					</div>
				</div>
				
				{floorPlan}
			
			</div>
		
		);
	}
}

export default EditFloor;