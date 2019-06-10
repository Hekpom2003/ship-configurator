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
        rows: 7,
        cols: 26,
        gridWidth: 1055,
        gridHeight: 160,
        offset: {
          top: 8,
          left: 150,
          right: 150,
          bottom: 7
        },

        rooms: [
          {
            id: 1,
            name: 'captain',
            x: 1,
            y: 1,
            width: 2,
            height: 2,
            service: true,
            roomClass: 11
          },
          {
            id: 2,
            name: 'rb0',
            x: 10,
            y: 1,
            width: 2,
            height: 2,
            service: false,
            roomClass: 42
          },
          {
            id: 3,
            name: 'rb1',
            x: 20,
            y: 4,
            width: 2,
            height: 2,
            service: false,
            roomClass: 42
          }
        ]

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

export default function filter(state = initialState, action) {
  return state;
}