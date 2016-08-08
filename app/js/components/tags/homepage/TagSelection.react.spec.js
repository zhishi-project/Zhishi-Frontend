import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import TagSelection from './TagSelection.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup() {
  let props = {
    tag: {id: 1, name: 'first tag'},
    onTagSelect: () => {}
  };

  return shallow(<TagSelection {...props} />);
}

describe('TagSelection', () => {
  it('renders the tag name', () => {
    const wrapper = setup();
    expect(wrapper.find('label').text()).toEqual('first tag');
  });
});
