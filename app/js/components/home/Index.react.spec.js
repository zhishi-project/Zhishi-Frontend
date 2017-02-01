import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import {Index} from './Index.react';

/* eslint-disable camelcase */

/**
* @return {Func} A shallow dom for tests
*/
function setup() {
  let props = {
    questions: {},
    topQuestions: {},
    page: 1
  };
  return shallow(<Index {...props} />);
}

describe('<Index />', () => {
  it('renders the Index component showing the homepage', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('HomePage').length).toEqual(1);
  });
});
