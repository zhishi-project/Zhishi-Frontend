// TODO WRITE TEST FOR COMMENT COMPONENT
import expect from 'expect';
import {spy} from 'sinon';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import AnswerUser from './AnswerUser.react';

/* eslint-disable camelcase */

let props = {
  created_at: '12/10/2012',
  user: {
    name: 'tester'
  }
},
  wrapper;

beforeEach(() => {
  wrapper = mount(<AnswerUser {...props} />);
});


describe('<AnswerUser />', () => {
  it('renders the AnswerUser component', () => {
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('a').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(4);
  });

  it('Test the user data rendered on the component', () => {
    expect(wrapper.find('.time-ago').text())
      .toNotBe('Answered (no date )');
    expect(wrapper.find('a').text()).toNotBe('No name yet');
    expect(wrapper.find('.badges').text()).toEqual('0');
    expect(wrapper.find('img').props().src)
      .toEqual('/assets/img/avatar.png');
  });

  it('Test the user data rendered on the component', () => {
    expect(wrapper.find('.time-ago').text())
      .toBe('Answered Mon Dec 10 2012');
    expect(wrapper.find('a').text()).toBe('tester');
  });

});
