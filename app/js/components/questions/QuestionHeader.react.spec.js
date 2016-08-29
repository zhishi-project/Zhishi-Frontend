import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import QuestionHeader from './QuestionHeader.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(editing) {
  let props = {
    question: {id: 1, title: 'Question title', editing},
    onChange: () => {}
  };
  return mount(<QuestionHeader {...props} />);
}

describe('<QuestionHeader />', () => {
  it('renders the tag component', () => {
    const wrapper = setup();
    expect(wrapper.find('span').text()).toEqual('Question title');
  });
});
