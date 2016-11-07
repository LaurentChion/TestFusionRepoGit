import expect from 'expect';

import { data } from './sensors_data';

import Sensor from '../../src//model/Sensor';

const sensors = new Array(data.length);

// création des données à partir des données
let i = 0;
for (i = 0; i < data.length; i += 1) {
  sensors[i] = new Sensor(data[i].id, data[i].name, data[i].type, data[i].data);
  console.log(sensors[i].toString());
}

// Test sur les sensors
describe('Sensor model tests', () => {
  // Test sur les types de sensor
  describe('Test Sensor\'s Type', () => {
    // Si le type de sensor est bien transmis
    it('SensorType TEMPERATURE is TEMPERATURE', () => {
      const s = new Sensor('id', 'name', 'TEMPERATURE', 2);
      expect(s.type).toEqual('TEMPERATURE');
    });

    // Si le type de sensor n'est pas définie le mettre à UNKNOWN
    it('SensorType is UNKNOWN when not in the enum', () => {
      const s = new Sensor('id', 'name', 'type', 2);
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

  // Test sur les data
  describe('Test Sensor\'s Data', () => {
    // Si la data avec la valeur 0 est bien reconnu
    it('Data with single value 0 is ok', () => {
      expect(sensors[1].data.value).toEqual(0);
    });
    // Tester les liste et refaire les gets et set
  });

  // Test sur l'Id'
  describe('Test Sensor\'s Id', () => {
    // Id is String
    it('Ids are strings', () => {
      for (i = 0; i < data.length; i += 1) {
        expect(sensors[i].id).toBeA('string');
      }
    });
    // Si l'identifiant n'est pas une chaine de caractère le convertir en chaine de caractère'
    it('Integer id is convert to string', () => {
      const s = new Sensor(1, 'name', 'type');
      expect(s.id).toBeA('string');
    });
    it('Float id is convert to string', () => {
      const s = new Sensor(1.0, 'name', 'type');
      expect(s.id).toBeA('string');
    });

    // Si l'id est un objet le rendre inconnue
    it('Object id are UnknownId', () => {
      const s = new Sensor({
        truc: 1,
        machin: 'blablabla',
      });
      expect(s.id).toEqual('UnknownId');
    });

    // Si l'id est undefined le rendre inconnue
    it('Undefined ids are UnknownId', () => {
      const s = new Sensor();
      expect(s.id).toEqual('UnknownId');
    });

    // Vérifier si l'id est unique <= (stocké les objets dans une base de données ?)
  });
});
