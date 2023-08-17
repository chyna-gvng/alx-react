import accessImmutableObject from './2-nested';

const obj = accessImmutableObject(
  {
    name: {
      first: 'Guillaume',
      last: 'Salva',
    },
  },
  ['name', 'first']
);

console.log(obj);
