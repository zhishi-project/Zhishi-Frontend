import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import QuestionContent from './QuestionContent.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(editing) {
  let props = {
    question: {id: 1, content: 'What do you mean', editing},
    onChange: () => {}
  };
  return mount(<QuestionContent {...props} />);
}

describe('<QuestionContent />', () => {
  it('renders the QuestionContent component without TinyMCE ' +
  'when not editing', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('TinyMCE').length).toEqual(0);
    expect(wrapper.find('div').text()).toEqual('What do you mean');
  });

  it('renders the QuestionContent component with TinyMCE ' +
  'when editing', () => {
    // const wrapper = setup(true);

    // assertions
    // expect(wrapper.find('TinyMCE').length).toEqual(1);
  });
});
