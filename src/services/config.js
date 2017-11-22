export class Config {

  baseUrl = 'https://www.zeta.hoeranlagenverzeichnis.ch';

  basemaps = [{
    type: 'google',
    id: 'roadmap',
    title: 'Standard',
    config: {
      type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
      styles: [{
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      }]
    }
  }, {
    type: 'google',
    id: 'satellite',
    title: 'Satellit',
    config: {
      type: 'satellite', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    }
  }];

  map = {
    basemap: 'roadmap',
    center: [46.801111, 8.226667],
    zoom: 7
  };
}
