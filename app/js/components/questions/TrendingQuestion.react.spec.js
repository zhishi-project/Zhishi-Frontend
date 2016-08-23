import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import TrendingQuestion from './TrendingQuestion.react';

/* eslint-disable camelcase */

/**
* @return {Func} A shallow dom for tests
*/
function setup() {
  let props = {
    question: {
      id: 1,
      title: 'Question Title',
      answers_count: 3
    }
  };
  return mount(<TrendingQuestion {...props} />);
}

describe('<TrendingQuestion />', () => {
  it('renders a question title and answers count', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('a').text()).toEqual('Question Title');
    expect(wrapper.find('div.two.column').text()).toEqual('3');
  });
});
