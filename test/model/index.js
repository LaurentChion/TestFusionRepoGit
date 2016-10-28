import expect from 'expect';

import { data } from './sensors_data';

import Sensor from '../../src//model/Sensor';

const sensors = new Array(data.length);

let i = 0;

for (i = 0; i < data.length; i += 1) {
  sensors[i] = new Sensor(data[i].id, data[i].name, data[i].type, data[i].data);
  console.log(sensors[i].toString());
}

describe('Sensor model tests', () => {
  /* TODO: Ecrire ici la suite de tests pourle modèle objet.*/

  // Test sur les types de sensor
  describe('Type of Sensor', () => {
    // Si le type de sensor n'est pas définie le mettre à UNKNOWN
    it('SensorType is UNKNOWN when not in the enum', () => {
      const s = new Sensor('id', 'name', 'type');
      expect(s.type).toEqual('UNKNOWN');
    });

    // Si le type de sensor est écrit en minuscule le mettre en majuscule.
    it('SensorType fan_speed equals to FAN_SPEED', () => {
      const s = new Sensor('id', 'name', 'fan_speed');
      expect(s.type).toEqual('FAN_SPEED');
    });

    // Si le type de sensor n'est pas une chaîne de caractère.
    it('SensorType isn\'t a string send UNKNOWN', () => {
      const s = new Sensor('id', 'name', 1);
      expect(s.type).toEqual('UNKNOWN');
    });
  });
});
