import { fromJS } from 'immutable';

const accessImmutableObject = (object, array) => {
  const mappedObj = fromJS(object);
  return mappedObj.getIn(array, undefined);
};

export default accessImmutableObject;
