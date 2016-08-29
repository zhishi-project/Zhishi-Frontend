import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import OptionButtons from './OptionButtons.react';

/* eslint-disable camelcase */

/**
* @return {Func} A shallow dom for tests
*/
function setup(user, editing) {
  let props = {
    question: {id: 1, name: 'first tag', editing, user},
    currentUser: {id: 1, first_name: 'John', last_name: 'Doe'},
    editQuestion: () => {}
  };
  return mount(<OptionButtons {...props} />);
}

describe('<OptionButtons />', () => {
  it('renders the OptionButtons component', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('.options').length).toEqual(1);
  });

  it('displays only the share button when not current user', () => {
    const wrapper = setup(true);

    // assertions
    expect(wrapper.find('a.item').length).toEqual(1);
    expect(wrapper.find('.item').text()).toEqual('share');
  });

  it('displays the edit button as edit and delete button ' +
      'when current user but not editing', () => {
    let user = {id: 1};
    const wrapper = setup(user, false);

    // assertions
    expect(wrapper.find('a').length).toEqual(3);
    expect(wrapper.find('a').first().text()).toEqual('edit');
    expect(wrapper.find('a').last().text()).toEqual('delete');
  });

  it('displays the edit button as Save ' +
        'when current user and editing', () => {
    let user = {id: 1};
    const wrapper = setup(user, true);

    // assertions
    expect(wrapper.find('a').first().text()).toEqual('Save');
  });
});
