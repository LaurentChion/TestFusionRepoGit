const TEMPERATURE = Symbol('TEMPERATURE');
const HUMIDITY = Symbol('HUMIDITY');
const LIGHT = Symbol('LIGHT');
const SWITCH = Symbol('SWITCH');
const DOOR = Symbol('DOOR');
const FAN_SPEED = Symbol('FAN_SPEED');

const SensorType = [];
SensorType[TEMPERATURE] = 'TEMPERATURE';
SensorType[HUMIDITY] = 'HUMIDITY';
SensorType[LIGHT] = 'LIGHT';
SensorType[SWITCH] = 'SWITCH';
SensorType[DOOR] = 'DOOR';
SensorType[FAN_SPEED] = 'FAN_SPEED';

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
    return this.attributes[0] || 0;
  }
  set id(val) {
    this.attributes[0] = val;
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
    this.attributes[3] = val;
  }
  get data() {
    return this.attributes[3] || 'No Data';
  }
  toString() {
    return (`(${this.id}, ${this.name}, ${this.type}, ${this.data})`);
  }
}
