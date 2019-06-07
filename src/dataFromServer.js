const dataFromServer = {
  shipList: [
    {
      id: 1,
      name: 'ShipName1',
      description: 'description for ship',
      floors: [
        {
          id: 1,
          name: 'Главная палуба',
          planImage: false,
          grid: {
            x: 29,
            y: 6,
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
  ],
};

export default dataFromServer;