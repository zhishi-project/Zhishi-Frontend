import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import HomePage from './HomePage.react';

/* eslint-disable camelcase */

/**
* @return {Func} A shallow dom for tests
*/
function setup() {
  let props = {
    filterDiv: () => {},
    ajaxIcon: () => {},
    questions: {1: {id: 1}, 2: {id: 2}},
    currentPage: 1
  };
  return shallow(<HomePage {...props} />);
}

describe('<HomePage />', () => {
  it('renders the HomePage component' +
    ' showing question meta data', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('.homepage').length).toEqual(1);
    expect(wrapper.find('Sidebar').length).toEqual(1);
    expect(wrapper.find('QuestionsList').length).toEqual(1);
    expect(wrapper.find('h2').text()).toEqual('Recent Questions');
  });
});
