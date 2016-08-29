import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import QuestionUser from './QuestionUser.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
    question: {id: 1, user: {
      id: 2,
      name: 'John Doe',
      image: '/imageLink',
      points: 10
    }}
  };
  return mount(<QuestionUser {...props} />);
}

describe('<QuestionUser />', () => {
  it('renders the tag component', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('.user-metadata').length).toEqual(1);
    expect(wrapper.find('a').text()).toEqual('John Doe');
    expect(wrapper.find('.badges').text()).toEqual('10');
    expect(wrapper.find('.profile-img').length).toEqual(1);
  });
});
