import {inject, bindable} from 'aurelia-framework';
import {History} from 'aurelia-history';
import {Database} from '../../services/db';
import {Storage} from '../../services/storage';
import {Config} from '../../services/config';
import {State} from '../../services/state';
import {System} from '../../models/system';
import {Building} from '../../models/building';
import {RoomType} from '../../models/room-type';
import {Technology} from '../../models/technology';
import * as ons from 'onsenui';

@inject(Database, Storage, Config, State, History)
export class Add {

  overlays = [];
  positionPageVisible = false;
  @bindable() coordinates;
  @bindable() positionHasAdress = false;
  @bindable() addressListVisible = false;
  @bindable() imageUrl;

  address = '';

  constructor(db, storage, config, state, history) {
    this.db = db;
    this.storage = storage;
    this.config = config;
    this.state = state;
    this.history = history;
    this.roomtypes = db.query(RoomType).all();
    this.technologies = db.query(Technology).all();
    this.data = {
      name: '',
      address: '',
      building: '',
      room: '',
      coordinates: null,
      roomtype: null,
      technology: null,
    };
    this.addressList = [];

    this.overlays = [];
    // this.system = new System({
    //   raum: '',
    //   raumnummer: '',
    //   building: new Building({
    //     name: ''
    //   }),
    // });
  }

  activate(params, routeConfig) {
    this.title = routeConfig.title;
  }

  showPositionPage(e) {
    e.target._input.blur();
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
  }

  onPreAdressListShow() {
    let popoverContent = this.addressListEl.getElementsByClassName('popover__content')[0];
    popoverContent.style.width = `${this.addressInputEl.clientWidth}px`;
  }

  onAddressChange(e) {
    let value = e.target.value;
    if (value.length >= 3) {
      // TODO: query address from google
      this.addressList = [{
        street: 'Strasse Hausnummer',
        location: 'Ort Kanton'
      }, {
        street: 'Strasse Hausnummer',
        location: 'Ort Kanton'
      }, {
        street: 'Strasse Hausnummer',
        location: 'Ort Kanton'
      }];
      this.addressListVisible = true;
    } else {
      this.addressListVisible = false;
    }
  }

  onAddressBlur() {
    this.addressListVisible = false;
  }

  onAddressFocus() {
    this.addressListVisible = true;
  }

  addressListVisibleChanged(newValue) {
    newValue ? this.showAddressListPopover() : this.hideAddressListPopover();
  }

  showAddressListPopover() {
    if (!this.addressListEl.visible && this.addressList.length > 0) {
      this.addressListEl.show(this.addressInputEl);
    }
  }

  hideAddressListPopover() {
    this.addressListEl.hide(this.addressInputEl);
  }

  onAddressListItemClick(item) {
    this.address = `${item.street} ${item.location}`;
  }

  coordinatesChanged(newValue) {
    if (newValue) {
      this.overlays = [{
        type: 'marker',
        latLng: newValue
      }];
      // TODO: get address from coordinates
      this.address = 'Addresse aus Position';
      this.positionHasAdress = true;
    }
  }

  onAcceptAddressClick() {
    this.data.coordinates = this.coordinates;
    this.data.address = this.address;
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
    //TODO: ajax request
    console.log(this.data);
  }
}
