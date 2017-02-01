import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import QuestionStat from './QuestionStat.react';

/* eslint-disable camelcase */

/**
* @return {Func} A shallow dom for tests
*/
function setup() {
  let props = {
    question: {
      id: 1,
      answers_count: 3,
      votes_count: 2,
      views: 3
    }
  };
  return shallow(<QuestionStat {...props} />);
}

describe('<QuestionStat />', () => {
  it('renders the QuestionStat component' +
    ' showing question meta data', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('.row').length).toEqual(1);
    expect(wrapper.find('.answer-count').text()).toEqual('3');
    expect(wrapper.find('.vote-count').text()).toEqual('2');
    expect(wrapper.find('.view-count').text()).toEqual('3');
  });
});
