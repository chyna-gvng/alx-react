import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('<Notification />', () => {
  const wrapper = shallow(<Notifications />);
  it('renders without crashing', () => {
    shallow(<Notifications />);
  });

  it('renders NotificationItem', () => {
    const nItem = wrapper.find('NotificationItem');
    expect(nItem).toBeDefined();
    expect(nItem.first().html()).toEqual(
      '<li data-notification-type="default">New course available</li>'
    );
  });

  it('renders the <p>', () => {
    expect(
      wrapper.containsMatchingElement(<p>Here is the list of notifications</p>)
    ).toBeTruthy();
  });
});
