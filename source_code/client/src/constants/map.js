const layers = [
  {
    id: 0,
    name: 'Restaurants',
    active: false,
    locations: [
      {
        id: 0,
        content: "Bogart's Smokehouse",
        coordinates: [38.6109607, -90.2050322],
      },
      {
        id: 1,
        content: "Pappy's Smokehouse",
        coordinates: [38.6350008, -90.2261532],
      },
      {
        id: 2,
        content: 'Broadway Oyster Bar',
        coordinates: [38.6188362, -90.1947098],
      },
      {
        id: 3,
        content: "Charlie Gitto's On the Hill",
        coordinates: [38.617972, -90.2756436],
      },
      {
        id: 4,
        content: 'Sugarfire',
        coordinates: [38.6304077, -90.1916921],
      },
      {
        id: 5,
        content: 'The Shaved Duck',
        coordinates: [38.6036282, -90.2381407],
      },
      {
        id: 6,
        content: 'Mango Restaurant',
        coordinates: [38.6313642, -90.1961267],
      },
      {
        id: 7,
        content: "Zia's Restaurant",
        coordinates: [38.6157376, -90.27716],
      },
      {
        id: 8,
        content: "Anthonio's Taverna",
        coordinates: [38.6143846, -90.280048],
      },
    ],
  },
  {
    id: 1,
    name: 'Caffee',
    active: false,
    locations: [
      {
        id: 0,
        content: "Bogart's Smokehouse",
        coordinates: [38.6209607, -90.2050322],
      },
      {
        id: 1,
        content: "Pappy's Smokehouse",
        coordinates: [38.6450008, -90.2261532],
      },
      {
        id: 2,
        content: 'Broadway Oyster Bar',
        coordinates: [38.6288362, -90.1947098],
      },
      {
        id: 3,
        content: "Charlie Gitto's On the Hill",
        coordinates: [38.627972, -90.2756436],
      },
      {
        id: 4,
        content: 'Sugarfire',
        coordinates: [38.6404077, -90.1916921],
      },
      {
        id: 5,
        content: 'The Shaved Duck',
        coordinates: [38.6136282, -90.2381407],
      },
      {
        id: 6,
        content: 'Mango Restaurant',
        coordinates: [38.6413642, -90.1961267],
      },
      {
        id: 7,
        content: "Zia's Restaurant",
        coordinates: [38.6257376, -90.27716],
      },
      {
        id: 8,
        content: "Anthonio's Taverna",
        coordinates: [38.6243846, -90.280048],
      },
    ],
  },
];

const mapBackground = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>';
const view = [38.63, -90.23];

export { attribution, layers, mapBackground, view };
