import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

describe('<App />', () => {
  it('App renders without crashing', () => {
    const wrapper = shallow(<App />);
  });

  it('App contain Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Notifications')).toHaveLength(1);
  });

  it('App contain Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('App contain Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('App contain Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Footer')).toHaveLength(1);
  });
});
