import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import {TrendingQuestions} from './TrendingQuestions.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
    topQuestions: {
      1: {id: 1},
      2: {id: 2}
    }
  };
  return shallow(<TrendingQuestions {...props} />);
}

describe('<TrendingQuestions />', () => {
  it('renders the TrendingQuestion component' +
    ' corresponding to the topQuestions props', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('h2').text()).toEqual('Trending');
    expect(wrapper.find('TrendingQuestion').length).toEqual(2);
  });
});
