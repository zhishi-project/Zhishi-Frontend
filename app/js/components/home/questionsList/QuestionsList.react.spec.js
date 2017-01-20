import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import QuestionsList from './QuestionsList.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup() {
  let props = {
    questions: {
      1: {id: 1},
      2: {id: 2}
    }
  };
  return shallow(<QuestionsList {...props} />);
}

describe('<QuestionsList />', () => {
  it('renders QuestionsListItems corresponding' +
    ' to the number of questions passed in', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('QuestionsListItem').length).toEqual(2);
  });
});
