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
    },
    selectedTags: ['first tag'],
    options: ['first pic', 'second pic'],
    onTagClick: () => {}
  };
  return shallow(<Tags {...props} />);
}

describe('<Tags />', () => {
  it('renders an array of tag components', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('.main').length).toEqual(1);
    expect(wrapper.find('Tag').length).toEqual(2);
  });
});
