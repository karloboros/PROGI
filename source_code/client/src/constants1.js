const layers = [
  {
    id: 0,
    name: 'Restaurants',
    active: false,
    features: [
      {
        id: 0,
        name: "Bogart's Smokehouse",
        coords: [38.6109607, -90.2050322],
      },
      {
        id: 1,
        name: "Pappy's Smokehouse",
        coords: [38.6350008, -90.2261532],
      },
      {
        id: 2,
        name: 'Broadway Oyster Bar',
        coords: [38.6188362, -90.1947098],
      },
      {
        id: 3,
        name: "Charlie Gitto's On the Hill",
        coords: [38.617972, -90.2756436],
      },
      {
        id: 4,
        name: 'Sugarfire',
        coords: [38.6304077, -90.1916921],
      },
      {
        id: 5,
        name: 'The Shaved Duck',
        coords: [38.6036282, -90.2381407],
      },
      {
        id: 6,
        name: 'Mango Restaurant',
        coords: [38.6313642, -90.1961267],
      },
      {
        id: 7,
        name: "Zia's Restaurant",
        coords: [38.6157376, -90.27716],
      },
      {
        id: 8,
        name: "Anthonio's Taverna",
        coords: [38.6143846, -90.280048],
      },
    ],
  },
  {
    id: 1,
    name: 'Caffee',
    active: false,
    features: [
      {
        id: 0,
        name: "Bogart's Smokehouse",
        coords: [38.6209607, -90.2050322],
      },
      {
        id: 1,
        name: "Pappy's Smokehouse",
        coords: [38.6450008, -90.2261532],
      },
      {
        id: 2,
        name: 'Broadway Oyster Bar',
        coords: [38.6288362, -90.1947098],
      },
      {
        id: 3,
        name: "Charlie Gitto's On the Hill",
        coords: [38.627972, -90.2756436],
      },
      {
        id: 4,
        name: 'Sugarfire',
        coords: [38.6404077, -90.1916921],
      },
      {
        id: 5,
        name: 'The Shaved Duck',
        coords: [38.6136282, -90.2381407],
      },
      {
        id: 6,
        name: 'Mango Restaurant',
        coords: [38.6413642, -90.1961267],
      },
      {
        id: 7,
        name: "Zia's Restaurant",
        coords: [38.6257376, -90.27716],
      },
      {
        id: 8,
        name: "Anthonio's Taverna",
        coords: [38.6243846, -90.280048],
      },
    ],
  },
];

const mapBackground = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>';
const view = [38.63, -90.23];

export { attribution, layers, mapBackground, view };
