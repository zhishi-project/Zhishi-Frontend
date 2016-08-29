import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import Question, {getQuestionId} from './Question.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  return shallow(<Question />);
}

describe('<Question />', () => {
  it('renders the Question component', () => {
    const wrapper = setup();
    expect(wrapper.find('div.full-height').length).toEqual(1);
  });
});

describe('getQuestionId()', () => {
  it('should retrieve the question id from the permalink', () => {
    let permalink = '2-how-can-i-fly';
    expect(getQuestionId(permalink)).toEqual('2');
  });
});
