import {inject, bindable} from 'aurelia-framework';
import {History} from 'aurelia-history';
import ons from 'onsenui';

@inject(History)
export class Add {

  overlays = [];
  positionPageVisible = false;
  // formattedAddress = '';
  addressListVisible = false;
  @bindable() coordinates;
  @bindable() bounds;
  @bindable() imageUrl;

  @bindable place = null;
  data = {
    place: null,
    image: null,
    annotations: '',
    username: '',
    useremail: ''
  };

  errors = {};

  addressList = [];

  searchTypes = [
    'art_gallery', 'bank', 'church', 'hindu_temple', 'hospital',
    'insurance_agency', 'local_government_office', 'mosque',
    'movie_theater', 'museum', 'pharmacy', 'police',
    'post_office', 'school', 'stadium', 'synagogue', 'university'
  ];

  constructor(history) {
    this.history = history;

    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder();
    this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
  }

  activate(params, routeConfig) {
    this.title = routeConfig.title;
  }

  showPositionPage() {
    this.history.history.pushState({}, '', '');
    this.positionPageVisible = true;
    window.addEventListener('popstate', this.onPositionPageBack.bind(this));
  }

  onPositionPageBack() {
    this.positionPageVisible = false;
    this.coordinates = this.data.coordinates;
    window.removeEventListener('popstate', this.onPositionPageBack.bind(this));
  }

  onPositionMapClick(e) {
    this.coordinates = e.detail.latlng;
    this.center = this.coordinates;
    this.searchNearBy(this.coordinates, 25)
      .then(result => {
        this.loadPlaceDetail(result.place_id);
      })
      .catch(() => {
        this.geocodeLocation(this.coordinates)
          .then(result => {
            this.loadPlaceDetail(result.place_id);
          })
          .catch(error => {
            alert("Nichts gefunden.");
          });
      });
  }

  onAddressChange(e) {
    let value = e.target.value;
    if (value.length >= 3) {
      this.queryAddressListItems(value)
        .then(() => {
          this.showAddressList();
        })
        .catch(() => {
          this.hideAddressList();
        });
    } else {
      this.hideAddressList();
    }
  }

  onAddressBlur() {
    if (this.place) {
      this.addressInputEl.value = this.place.name;
    }
    this.hideAddressList();
  }

  onAddressFocus() {
    this.showAddressList();
  }

  onAddressListItemClick(item) {
    this.loadPlaceDetail(item.place_id)
      .then(place => {
        let bounds = place.geometry.viewport.toJSON();
        this.leafletMap.map.fitBounds([
          [bounds.north, bounds.east],
          [bounds.south, bounds.west]
        ]);
        this.coordinates = place.geometry.location.toJSON();
      });
  }

  showAddressList() {
    if (!this.addressListVisible && this.addressList.length > 0) {
      this.addressListVisible = true;
    }
  }

  hideAddressList() {
    this.addressListVisible = false;
  }

  placeChanged(newValue) {
    if (newValue) {
      this.queryAddressListItems(newValue.name);
    }
  }

  searchNearBy(location, radius) {
    return new Promise((resolve, reject) => {
      this.placesService.nearbySearch({
        location: location,
        radius: radius
      }, (results, status) => {
        if (results) {
          let result = results.find(x => this.searchTypes.find(t => x.types.indexOf(t) > -1));
          if (result) {
            resolve(result);
          } else {
            reject(status);
          }
        } else {
          reject(status);
        }
      });
    });
  }

  geocodeLocation(location) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({
        location: location
      }, (results, status) => {
        if (status === 'OK') {
          resolve(results[0]);
        } else {
          reject(status);
        }
      });
    });
  }

  queryAddressListItems(value) {
    return new Promise((resolve, reject) => {
      let center = this.leafletMap.map.getCenter();
      let location = new google.maps.LatLng(center.lat, center.lng);
      this.autocompleteService.getPlacePredictions({
        input: value,
        location: location,
        radius: 10000,
        types: ['address']
      }, (predictions, status) => {
        if (predictions !== null) {
          this.addressList = predictions;
          resolve();
        } else {
          this.addressList = [];
          reject();
        }
      });
    });
  }

  loadPlaceDetail(id) {
    return new Promise((resolve, reject) => {
      this.placesService.getDetails({
        placeId: id
      }, (place, status) => {
        this.place = place;
        if (place !== null) {
          resolve(place);
        } else {
          reject(status);
        }
      });
    });
  }

  coordinatesChanged(newValue) {
    if (newValue) {
      this.overlays = [{
        type: 'marker',
        latLng: L.latLng(newValue.lat, newValue.lng)
      }];
    } else {
      this.overlays = [];
    }
  }

  onAcceptAddressClick() {
    let bounds = this.place.geometry.viewport.toJSON();
    this.data.coordinates = this.coordinates;
    this.data.place = this.place;
    this.bounds = [
      [bounds.north, bounds.east],
      [bounds.south, bounds.west]
    ];
    this.validate();
    this.history.history.back();
  }

  uploadImageClick() {
    this.imageInputEl.click();
  }

  onImageChange() {
    let file = this.imageInputEl.files[0];
    if (file) {
      this.image = this.imageInputEl.files[0];
      if (this.imageUrl) {
        URL.revokeObjectURL(this.imageUrl);
      }
      this.imageUrl = URL.createObjectURL(this.image);
    }
  }

  deleteImage() {
    URL.revokeObjectURL(this.imageUrl);
    this.imageUrl = null;
    this.image = null;
  }

  commit() {
    this.validate();
    if (Object.keys(this.errors).length === 0) {
      //TODO: prepare data and send to server
      console.log(this.data);
    } else {
      ons.notification.alert('Geben Sie eine Adresse, Ihr Name und Ihre E-Mail-Adresse ein', {
        title: 'Fehlende Anlage melden'
      });
    }
  }

  validate() {
    this.errors = {};
    if (!this.data.place) {
      this.errors.address = 'Bitte geben Sie eine gültige Adresse ein.';
    }
    if (!this.data.username) {
      this.errors.username = 'Bitte geben Sie Ihren Namen an.';
    }
    if (!this.data.useremail) {
      this.errors.useremail = 'Bitte geben Sie Ihre E-Mail-Addresse an.';
    }
  }
}
