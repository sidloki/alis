export class Config {

  baseUrl = '//www.zeta.hoeranlagenverzeichnis.ch';

  basemaps = [{
    type: 'google',
    id: 'roadmap',
    config: {
      type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
      styles: [{
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }]
      }]
    }
  }];

  map = {
    basemap: 'roadmap',
    center: [46.801111, 8.226667],
    zoom: 7
  };
}
