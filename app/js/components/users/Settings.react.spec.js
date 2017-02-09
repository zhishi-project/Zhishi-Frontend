import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import {mount} from 'enzyme';
import Settings from './Settings.react';

let wrapper;
let props = {
  user: {
    'id': 1,
    'name': 'Heavywater',
    'points': 10,
    'preference': {
      slack: true,
      email: false,
      newsletter: true
    },
    'questions_asked': 3,
    'answers_given': 2
  },
  slackToggle: false,
  params: {
    id: '1-Heavywater'
  },
  currentUser: {id: 1}
};

describe('<Settings />', () => {
  beforeEach(() => {
    wrapper = mount(<Settings {...props}/>);
  });

  it('should test that the slack input toggle has a value for checked', () => {
    const slackInputToggle = wrapper.find('.slackToggle');
    wrapper.setProps({slackToggle: true});
    expect(slackInputToggle.props().checked).toBe(true);
  });

  it('should change the checked value of the slack input during onchange event', () => {
    const slackInputToggle = wrapper.find('.slackToggle');
    const handleSlackToggle = sinon.spy();
    wrapper.setProps({handleSlackToggle});
    slackInputToggle.simulate('change');
    expect(handleSlackToggle.called).toBe(true);
  });
});


