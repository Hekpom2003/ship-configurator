import React from 'react';
import ShipList from './ShipList';
import ShipEdit from './ShipEdit';
import Preloader from '../Preloader';
import {AJAX_PATH_ROOT} from '../../constants/ajaxPath';
import store from '../../store';
import {AUTHORIZATION_SET_STATE} from "../../constants/authorization";
import {SHIP_LIST_SET_DATA} from "../../constants/shipList";

class ShipConfigurator extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			editShip: false,
			editCruise: false,
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
									newDataList[oData.items[i].ID].floors = oFloors.floors;
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
					payload: newDataList,
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
		} else {
			console.log('DATALIST', store.getState());
		}
	}
	
	render() {
		
		const {shipList} = this.props.data;
		
		let component;
		
		if (this.state.loading) {
			component = <Preloader/>;
		} else {
			switch (this.state.editShip) {
				case false:
					component = <ShipList
						shipList={shipList}
						_onEditShip={key => this.setState({editShip: key})}
						_onEditCruise={key => this.setState({editCruise: key})}
					/>;
					break;
				case true :
					component = <ShipEdit/>;
					break;
				default:// это как?
					component = <ShipEdit
						ship={shipList[this.state.editShip]}
						
						_cancelEdit={() => this.setState({editShip: false})}
					/>;
				
			}
		}
		
		return (
			<div className={'ship-configurator'}>
				<div className="ship-configurator__title">Конфигуратор корабля</div>
				
				{component}
			
			</div>
		);
	}
}

export default ShipConfigurator;
