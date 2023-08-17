import { List } from 'immutable';

export const getListObject = (array) => List(array);

export const addElementToList = (list, element) => list.push(element);
