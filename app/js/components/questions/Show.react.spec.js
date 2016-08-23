import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import Show from './Show.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
    tag: {id: 1, name: 'first tag'},
    index: 1,
    options: ['first pic', 'second pic'],
    selectedStatus: status,
    onShowClick: () => {}
  };
  return mount(<Show {...props} />);
}

describe('<Index />', () => {
  it('renders the tag component', () => {
    // const wrapper = setup();

    // assertions
    // expect(wrapper.find('.tag').length).toEqual(1);
    // expect(wrapper.find('.desc').text()).toEqual('first tag');
  });
});
