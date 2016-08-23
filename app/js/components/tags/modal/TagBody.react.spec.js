import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import TagBody from './TagBody.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(selected) {
  let props = {
    tags: {
      1: {id: 1, name: 'first tag'},
      2: {id: 2, name: 'second tag'}
    },
    selectedTags: [selected],
    options: {modalId: 'modal-id'},
    TagThumbnails: ['first pic', 'second pic'],
    onTagClick: () => {},
    persistSelection: () => {}
  };
  return mount(<TagBody {...props} />);
}

describe('<TagBody />', () => {
  it('renders TagBody with <Tags /> and the modal trigger', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('TagBody').length).toEqual(1);
    expect(wrapper.find('Tags').length).toEqual(1);
    expect(wrapper.find('TagSelectionCountdown').length).toEqual(1);
    expect(wrapper.find('a.modal-id-trigger').length).toEqual(1);
  });

  it('shows selected tags as selected', () => {
    const wrapper = setup('first tag');
    const selectedEl = wrapper.find('.tag.selected');

    // assertions
    expect(selectedEl.length).toEqual(1);
    expect(selectedEl.find('.desc').text()).toEqual('first tag');
  });
});
