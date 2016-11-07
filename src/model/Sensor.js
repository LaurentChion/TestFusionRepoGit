import { Data, Datum, TimeSeries } from './Data';

import {
  SensorType,
  TEMPERATURE,
  HUMIDITY,
  LIGHT,
  SWITCH,
  DOOR,
  FAN_SPEED } from './SensorType';

export default class Sensor {

  constructor(id, name, type, data) {
    // Initialisation du tableau contenant les attributs
    this.attributes = [4];

    // attributions des valeurs
    this.id = id;
    this.name = name;
    this.type = type;
    this.data = data;
  }
  get id() {
    return this.attributes[0] || 'UnknownId';
  }
  set id(val) {
    if (typeof val === 'string') {
      this.attributes[0] = val;
    } else if (typeof val === 'number') {
      this.attributes[0] = val.toString();
    } else {
      this.attributes[0] = 'UnknownId';
    }
  }
  set name(val) {
    this.attributes[1] = val;
  }
  get name() {
    return this.attributes[1] || '';
  }
  get type() {
    return this.attributes[2] || 'UNKNOWN';
  }
  set type(val) {
    if (typeof val === 'string') {
      switch (val.toUpperCase()) {
        case 'TEMPERATURE' :
          this.attributes[2] = SensorType[TEMPERATURE];
          break;
        case 'HUMIDITY' :
          this.attributes[2] = SensorType[HUMIDITY];
          break;
        case 'LIGHT' :
          this.attributes[2] = SensorType[LIGHT];
          break;
        case 'SWITCH' :
          this.attributes[2] = SensorType[SWITCH];
          break;
        case 'DOOR' :
          this.attributes[2] = SensorType[DOOR];
          break;
        case 'FAN_SPEED' :
          this.attributes[2] = SensorType[FAN_SPEED];
          break;
        default :
          this.attributes[2] = null;
      }
    } else {
      this.attributes[2] = null;
    }
  }
  set data(val) {
    if (typeof val !== 'undefined') {
      if (typeof val.value !== 'undefined') {
        this.attributes[3] = new Datum(val.value);
      } else if (val.values && val.labels) {
        this.attributes[3] = new TimeSeries(val.values, val.labels);
      } else {
        this.attributes[3] = new Data();
      }
    } else {
      this.attributes[3] = new Data();
    }
  }
  get data() {
    return this.attributes[3] || 'No Data';
  }
  toString() {
    return (`(${this.id}, ${this.name}, ${this.type}, ${this.data})`);
  }
}
