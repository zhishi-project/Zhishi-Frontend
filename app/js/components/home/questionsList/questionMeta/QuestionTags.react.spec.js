import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import QuestionTags from './QuestionTags.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
    question: {
      tags: ['check', 'again']
    }
  };
  return shallow(<QuestionTags {...props} />);
}

describe('<QuestionTags />', () => {
  it('renders the QuestionTags component', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('.tags').length).toEqual(1);
    expect(wrapper.find('span').length).toEqual(2);
  });
});
