import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars

/*
  destructing the TagModal so we can bypass redux
  and test the component as a pure function
*/

import {TagModal} from './TagModal.react';

/**
* @return {Func} Mounting the component (not shallow)
*/
function setup() {
  let props = {
    tags: {
      1: {id: 1, name: 'first tag'},
      2: {id: 2, name: 'second tag'}
    },
    selectedTags: [],
    onTagClick: () => {},
    persistSelection: () => {},
    actions: {
      loadTags: () => {}
    }
  };
  return mount(<TagModal {...props} />);
}

describe('<TagModal />', () => {
  it('mounts the <TagBody />', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('TagBody').length).toEqual(1);
  });
});
