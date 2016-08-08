import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import Tags from './Tags.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup() {
  let props = {
    tags: {
      1: {id: 1, name: 'first tag'},
      2: {id: 2, name: 'second tag'}
    }
  };
  return mount(<Tags {...props} />);
}

describe('Tags', () => {
  it('renders an array of tags', () => {
    const wrapper = setup();
    const firstDomTagEl = wrapper.find('span').first();
    // assertions
    expect(wrapper.find('.tags').length).toEqual(1);
    expect(firstDomTagEl.text()).toEqual('first tag');
  });
});
