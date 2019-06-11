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
            path: [
              "0,0",
              "0,20.714285714285715",
            ],
            /**
             * serviceSpace - Служебное помещение,
             * class1,
             * class2,
             * class3,
             */
            roomClass: 'serviceSpace',
          },
          {
            id: 2,
            name: 'captain',
            path: ["174.23076923076923,0"],
            /**
             * serviceSpace - Служебное помещение,
             * class1,
             * class2,
             * class3,
             */
            roomClass: 'class1',

          },
          {
            id: 3,
            name: 'captain',
            path: [
              "406.53846153846155,62.142857142857146",
              "435.5769230769231,62.142857142857146",
            ],
            /**
             * serviceSpace - Служебное помещение,
             * class1,
             * class2,
             * class3,
             */
            roomClass: 'class2',

          },


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