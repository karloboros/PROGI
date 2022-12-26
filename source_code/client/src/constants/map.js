const layers = [
  {
    id: 0,
    name: 'Restaurants',
    active: false,
    features: [
      {
        id: 0,
        name: "Bogart's Smokehouse",
        coords: [45.801562157821536, 15.97102811303265],
      },
      {
        id: 1,
        name: "Pappy's Smokehouse",
        coords: [45.80156257821536, 16.971028191303265],
      },
      {
        id: 2,
        name: 'Broadway Oyster Bar',
        coords: [45.801562157821536, 15.971028191303265],
      },
      {
        id: 3,
        name: "Charlie Gitto's On the Hill",
        coords: [44.80156217821536, 15.97102819133265],
      },
      {
        id: 4,
        name: 'Sugarfire',
        coords: [43.01562157821536, 14.97102819303265],
      },
      {
        id: 5,
        name: 'The Shaved Duck',
        coords: [45.801562157821536, 13.971028191303265],
      },
      {
        id: 6,
        name: "Zia's Restaurant",
        coords: [43.80156215782136, 15.971028191303265],
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
        coords: [44.91562157821536, 12.971028191303265],
      },
      {
        id: 1,
        name: "Pappy's Smokehouse",
        coords: [45.2157821536, 15.191303265],
      },
      {
        id: 2,
        name: 'Broadway Oyster Bar',
        coords: [45.801562157821536, 15.971028191303265],
      },
      {
        id: 3,
        name: "Charlie Gitto's On the Hill",
        coords: [45.801562157821536, 15.971028191303265],
      },
      {
        id: 4,
        name: 'Sugarfire',
        coords: [41.801562157821536, 15.971028191303265],
      },
      {
        id: 5,
        name: 'The Shaved Duck',
        coords: [44.01562157821536, 15.028191303265],
      },
    ],
  },
];

const mapBackground = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>';
const view = [45.801562157821536, 15.971028191303265];

export { attribution, layers, mapBackground, view };
