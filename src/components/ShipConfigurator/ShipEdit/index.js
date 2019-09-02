import React from 'react';
import './style.scss';
import {connect} from 'react-redux';
import {SHIP_EDIT__SET_ITEM} from '../../../constants/shipEdit';
import Preloader from '../../Preloader';
import ShipEditComponent from './ShipEditComponent';
import store from "../../../store";
import AJAX_PATH_ROOT from "../../../constants/ajaxPath";
import {SHIP_LIST_SET_DATA} from "../../../constants/shipList"

class ShipEdit extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loading: true
		};
		
	}
	
	loadAndBuildShipListFromApi(shipId) {
		let headers = new Headers();
		headers.append('Authorization', 'Bearer ' + store.getState().authentication.token);
		
		let newDataList = {};
		
		let fetchesToDo = 1;
		
		fetch(AJAX_PATH_ROOT + '/public/ships/' + shipId + '/', {headers})
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
				
				this.props._setDataFromServer(this.props.shipsList[0]);
				this.setState({
					loading: false
				});
				
				clearInterval(interval);
			}
		}, 100);
		
	}
	
	componentDidMount() {
		const shipId = this.props.match.params.shipId || false;
		
		if (this.state.loading) {
			this.loadAndBuildShipListFromApi(shipId);
		}
	}
	
	render() {
		
		if (this.state.loading) {
			return (
				<Preloader/>
			)
		} else {
			return (
				<ShipEditComponent/>
			)
		}
	}
}

const mapStateProp = state => ({
	shipEdit: state.shipEdit,
	shipsList: state.shipsList,
});

const mapDispachProps = dispatch => {
	return {
		_setDataFromServer: data => dispatch({type: SHIP_EDIT__SET_ITEM, payload: data}),
		
	}
};

export default connect(mapStateProp, mapDispachProps)(ShipEdit);