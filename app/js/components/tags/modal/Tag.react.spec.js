import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import Tag from './Tag.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
    tag: {id: 1, name: 'first tag'},
    index: 1,
    TagThumbnails: ['first pic', 'second pic'],
    selectedStatus: status,
    onTagClick: () => {}
  };
  return mount(<Tag {...props} />);
}

describe('<Tag />', () => {
  it('renders the tag component', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('.tag').length).toEqual(1);
    expect(wrapper.find('.desc').text()).toEqual('first tag');
  });

  it('applies the selected class when tag is selected', () => {
    const wrapper = setup('selected');

    // assertions
    expect(wrapper.find('.selected').length).toEqual(1);
  });
});
