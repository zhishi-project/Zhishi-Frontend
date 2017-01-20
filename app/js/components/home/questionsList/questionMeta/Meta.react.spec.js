import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import MetaMobileOnly from './MetaMobileOnly.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup() {
  let props = {
    username: 'johndoe',
    userPermalink: '3-johndoe'
  };
  return mount(<MetaMobileOnly {...props} />);
}

describe('<MetaMobileOnly />', () => {
  it('renders the MetaMobileOnly component', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('a').text()).toEqual('johndoe');
  });
});
