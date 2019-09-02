import React from 'react';
import './style.scss';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {SHIP_EDIT__SET_ITEM} from '../../../constants/shipEdit';
import store from "../../../store";
import AJAX_PATH_ROOT from "../../../constants/ajaxPath";
import {SHIP_LIST_SET_DATA} from "../../../constants/shipList";

class ShipList extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loading: true
		}
	}
	
	loadAndBuildShipListFromApi() {
		let headers = new Headers();
		headers.append('Authorization', 'Bearer ' + store.getState().authentication.token);
		
		let newDataList = {};
		
		let fetchesToDo = 1;
		
		fetch(AJAX_PATH_ROOT + '/public/ships/', {headers})
			.then(resp => resp.json())
			.then(oData => {
				if (!oData.error) {
					for (let i in oData.items) {
						newDataList[oData.items[i].ID] = {
							id: oData.items[i].ID,
							name: oData.items[i].UF_NAME,
							description: oData.items[i].UF_DESCRIPTION,
							floors: []
						};
						fetchesToDo++;
						fetch(AJAX_PATH_ROOT + '/public/ships/' + oData.items[i].ID + '/floors/', {headers})
							.then(resp => resp.json())
							.then(oFloors => {
								if (!oFloors.error) {
									newDataList[oData.items[i].ID].floors = Object.values(oFloors.floors);
								}
								fetchesToDo--;
							});
						
					}
				}
				
				fetchesToDo--;
			});
		
		let interval = setInterval(() => {
			if (fetchesToDo === 0) {
				store.dispatch({
					payload: Object.values(newDataList),
					type: SHIP_LIST_SET_DATA
				});
				
				this.setState({
					loading: false
				});
				
				clearInterval(interval);
			}
		}, 100);
		
	}
	
	componentDidMount() {
		// loop prevention
		if (this.state.loading) {
			this.loadAndBuildShipListFromApi();
		}
	}
	
	render() {
		console.log('PS', this.props);
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
								this.props.shipsList.map((item, key) =>
									<div className="ships-list-table__row" key={key}>
										<div>{item.id}</div>
										<div>{item.name}</div>
										<div>{item.description}</div>
										<div><Link to={'/ship-configurator/edit-ship/' + key + '/'}>edit</Link></div>
										<div>edit</div>
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

const mapStateProp = state => ({
	shipsList: state.shipsList
});

const mapDispachProps = dispatch => {
	return {
		onShipEdit: ship => dispatch({type: SHIP_EDIT__SET_ITEM, payload: ship}),
		
	}
};

export default connect(mapStateProp, mapDispachProps)(ShipList);