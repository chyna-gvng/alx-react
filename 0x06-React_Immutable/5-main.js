import { concatElements, mergeElements } from './5-merge';

const arr1 = ['one', 'two'];
const arr2 = ['three', 'four'];

const obj1 = {
  fear: true,
  smell: -1033575916.9145899,
  wall: false,
  thing: -914767132,
};
const obj2 = {
  1: 'Liam',
  2: 'Noah',
  3: 'Elijah',
  4: 'Oliver',
  5: 'Jacob',
  6: 'Lucas',
};

console.log(concatElements(arr1, arr2), concatElements(arr1, arr2).toJS());

console.log(mergeElements(obj1, obj2), mergeElements(obj1, obj2).toJS());
