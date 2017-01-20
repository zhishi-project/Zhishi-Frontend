import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import Title from './Title.react';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
    title: 'question title',
    permalink: '1-question-title'
  };
  return shallow(<Title {...props} />);
}

describe('<Title />', () => {
  it('renders the Title component', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('.question-container').length).toEqual(1);
  });
});
