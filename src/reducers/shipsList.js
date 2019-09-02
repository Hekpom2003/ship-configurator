import {SHIP_LIST_SET_DATA} from '../constants/shipList';

const initialState = [
	{
		id: 1,
		name: 'ShipName1',
		description: 'description for ship',
		floors: [
			{
				id: 1,
				name: 'Главная палуба',
				planImage: false,
				image: {
					width: 1055,
					height: 1055,
				},
				gridOffset: {
					top: 8,
					left: 150,
					right: 150,
					bottom: 7
				},
				
				gridMatrix: [
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				],
				
				rooms: {
					1: {
						id: 1,
						name: 'СП',
						/**
						 * serviceSpace - Служебное помещение,
						 * class1,
						 * class2,
						 * class3,
						 */
						roomClass: 'serviceSpace',
					},
					2: {
						id: 2,
						name: 'captain',
						/**
						 * serviceSpace - Служебное помещение,
						 * class1,
						 * class2,
						 * class3,
						 */
						roomClass: 'class1',
						
					},
					3: {
						id: 3,
						name: 'Каюта',
						/**
						 * serviceSpace - Служебное помещение,
						 * class1,
						 * class2,
						 * class3,
						 */
						roomClass: 'class2',
						
					},
				}
				
			}
		],
	},
	{
		id: 2,
		name: 'ShipName2',
		description: 'description for ship',
		floors: [],
	},
];

export default function shipList(state = initialState, action) {
	
	if (action.type === SHIP_LIST_SET_DATA) {
		
		return action.payload;
	}
	
	return state;
}