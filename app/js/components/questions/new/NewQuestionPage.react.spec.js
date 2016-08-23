import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import NewQuestionPage from './NewQuestionPage.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
    onUpdateQuestionState: () => {},
    onSubmitClick: () => {}
  };
  return mount(<NewQuestionPage {...props} />);
}

describe('<NewQuestionPage />', () => {
  it('renders the NewQuestionPage component', () => {
    // const wrapper = setup();

    // assertions
    // expect(wrapper.find('.ask-question').length).toEqual(1);
    // expect(wrapper.find('h2').first().text()).toEqual('New Question');
  });
});
