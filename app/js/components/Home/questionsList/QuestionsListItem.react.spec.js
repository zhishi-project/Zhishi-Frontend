import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import QuestionsListItem from './QuestionsListItem.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
    question: {id: 1}
  };
  return mount(<QuestionsListItem {...props} />);
}

describe('<QuestionsListItem />', () => {
  it('renders the tag component', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('.question-section').length).toEqual(1);
  });
});
