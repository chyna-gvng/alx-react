import { Map } from 'immutable';
import printBestStudents from './8-seq';

const obj = {
  1: {
    score: 99,
    firstName: 'guillaume',
    lastName: 'salva',
  },
  2: {
    score: 70,
    firstName: 'Julien',
    lastName: 'Barbier',
  },
  3: {
    score: 69,
    firstName: 'Sylvain',
    lastName: 'Kalache',
  },
};

printBestStudents(obj);
