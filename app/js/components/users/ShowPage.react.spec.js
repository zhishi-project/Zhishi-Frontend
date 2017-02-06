import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import ShowPage from './ShowPage.react';

/* eslint-disable camelcase */

let props = {
    user: {
      id: 1,
      name: 'Heavywater',
      points: 10,
      questions_asked: 3,
      answers_given: 2
    },
    params: {
      id: '1-Heavywater'
    },
    currentUser: {id: 1}
  },
  wrapper;

describe('<ShowPage />', () => {
  beforeEach(() => {
    wrapper = shallow(<ShowPage {...props} />);
  });

  it('Should test the element with "main-wrapper" class and its children', () => {
    expect(wrapper.find('.main-wrapper').length).toEqual(1);
    expect(wrapper.find('.main-wrapper').children().length).toEqual(1);
    expect(wrapper.find('.container').children().length).toEqual(3);
  });

  it('Should have an image element', () => {
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('img').props().src).toEqual('/assets/img/avatar.png');
    expect(wrapper.find('img').props().alt).toEqual('Profile');
    props.user.image = 'user/heavywater.png';
  });

  it('Should render the user image and point data', () => {
    let containerDom = wrapper.find('.content').children();

    expect(wrapper.find('img').props().src).toEqual('user/heavywater.png');
    expect(containerDom.nodes[1] + containerDom.nodes[2])
      .toEqual(`Reputation: ${props.user.points}`);
  });

  it('Should render correct number of questions answered', () => {
    let containerDom = wrapper.find('a').text();

    expect(containerDom).toEqual('Asked 3 questions.  Gave 2 answers');
  });

  it('Should render the username', () => {
    let containerDom = wrapper.find('h2').text();

    expect(containerDom).toEqual('Heavywater');
  });
});
