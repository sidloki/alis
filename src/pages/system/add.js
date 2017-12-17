import {inject, bindable} from 'aurelia-framework';
import {History} from 'aurelia-history';
import {HttpClient} from 'aurelia-fetch-client';
import * as ons from 'onsenui';
import {Config} from '../../services/config';
import {Database} from '../../services/db';
import {Canton} from '../../models/canton';

@inject(History, Config, Database)
export class Add {

  overlays = [];
  positionPageVisible = false;
  addressListVisible = false;
  @bindable() coordinates;
  @bindable() bounds;
  @bindable() imageUrl;
  image = null;

  @bindable place = null;
  data = {
    name: '',
    formatted_address: '',
    street_number: '',
    postcode: '',
    location: '',
    canton: '',
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

  constructor(history, config, db) {
    this.history = history;
    this.config = config;
    this.db = db;
    this.httpClient = new HttpClient();
    this.httpClient.configure(cfg => {
      cfg.useStandardConfiguration()
         .withBaseUrl(`${this.config.baseUrl}/db_add_system.php`)
         .withDefaults();
    });

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
            ons.notification.alert('Nichts gefunden.', {
              title: 'Für die gewählte Position konnte keine Adresse gefunden werden.'
            });
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
        if (status === 'OK') {
          this.addressList = predictions;
          resolve(predictions);
        } else {
          this.addressList = [];
          resolve([]);
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
    this.data.name = this.place.name || '';
    this.data.formatted_address = this.place.formatted_address;
    this.data.lat = this.coordinates.lat;
    this.data.lng = this.coordinates.lng;
    this.data.website = this.place.website || '';
    this.place.address_components.forEach(c => {
      if (c.types.indexOf('postal_code') > -1) {
        this.data.postcode = c.long_name;
      } else if (c.types.indexOf('route') > -1) {
        this.data.street = c.long_name;
      } else if (c.types.indexOf('street_number') > -1) {
        this.data.housenumber = c.long_name;
      } else if (c.types.indexOf('administrative_area_level_1') > -1) {
        this.data.canton = this.db.query(Canton).get('name', c.short_name);
      } else if (c.types.indexOf('locality') > -1) {
        this.data.location = c.long_name;
      }
    });
    this.bounds = [
      [bounds.north, bounds.east],
      [bounds.south, bounds.west]
    ];
    this.errors.address = null;
    this.history.history.back();
  }

  uploadImageClick() {
    this.imageInputEl.click();
  }

  onImageChange() {
    let file = this.imageInputEl.files[0];
    if (file) {
      this.image = file;
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
    let formData = new FormData();
    formData.append('username', this.data.username);
    formData.append('useremail', this.data.useremail);

    formData.append('name', this.data.name);
    formData.append('lat', this.data.lat);
    formData.append('lng', this.data.lng);
    formData.append('street_number', `${this.data.street} ${this.data.housenumber}`);
    formData.append('location', this.data.location);
    formData.append('postcode', this.data.postcode);
    formData.append('cantonId', this.data.canton ? this.data.canton.id : null);
    formData.append('website', this.data.website);
    formData.append('annotations', this.data.annotations);
    formData.append('image', this.image);

    this.httpClient.fetch('', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.code !== 200) {
        this.errors = data.errors;
        this.showInvalidAlert(data.message);
      } else {
        this.showSuccessMessage();
      }
    });
  }

  showInvalidAlert(msg) {
    ons.notification.alert(msg, {
      title: 'Fehlende Anlage melden'
    });
  }

  showSuccessMessage() {
    ons.notification.alert('Ihre Daten wurden gesendet und werden überprüft.', {
      title: 'Vielen Dank',
      callback: () => {
        this.history.navigateBack();
      }
    });
  }

  validate(event) {
    this.errors[event.target.id] = null;
  }
}