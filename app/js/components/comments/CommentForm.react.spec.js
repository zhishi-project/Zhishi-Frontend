import expect from 'expect';
import {spy} from 'sinon';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import CommentForm from './CommentForm.react';

/* eslint-disable camelcase */

let props = {
  filterDiv: () => {},
  questions: {1: {id: 1}, 2: {id: 2}},
  onChange: spy(),
  saveComment:  spy(),
  cancelComment: spy(),
  comment: {
    content: 'this is a test content'
  },
  submitBtnDisabled: false
}, 
  wrapper;

describe('<CommentForm />', () => {
  beforeEach(() => {
    wrapper = mount(<CommentForm {...props} />);
  });

  it('renders the CommentForm component', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(2);
  });

  it('Test input value', () => {
    expect(wrapper.find('textarea').get(0).value).toEqual('this is a test content');
    expect(wrapper.find('#cancelBtn').text()).toEqual('Cancel');
    expect(wrapper.find('button').at(0).text()).toEqual('Post Comment');
  });

  it('Test the disabled button', () => {
    expect(wrapper.find('button').at(0).props().disabled).toBe(false);
    expect(wrapper.find('button').at(1).props().disabled).toBe(false);
  });

  it('Test the click event of the button', () => {
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');
    expect(props.saveComment.calledOnce).toBe(true);
    expect(props.cancelComment.calledOnce).toBe(true);
  });

  it('Test the textarea change event', () => {
    wrapper.find('textarea').simulate('change');
    expect(props.onChange.calledOnce).toBe(true);
  });

});
