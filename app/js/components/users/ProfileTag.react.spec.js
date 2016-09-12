import expect from 'expect';
import {spy} from 'sinon';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import ProfileTag from './ProfileTag.react';

/* eslint-disable camelcase */

let props = {
    user: {id: 1},
    currentUser: {id: 1},
    tags:  ['java', 'python', 'js'],
    modalTrigger: 'modal'
  },
  wrapper;

describe('<ProfileTag />', () => {
  beforeEach(() => {
    wrapper = mount(<ProfileTag {...props} />);
  });

  describe('Test the html structure of ProfileTag component', () => {
    it('Should have a single element with class name profile-tags', () => {
      expect(wrapper.find('.profile-tags').length).toEqual(1);
      expect(wrapper.find('.profile-tags').props().className)
        .toEqual('ui card profile-tags');
    });

    it('Element with "profile-tags" class should have a single div child', () => {
      expect(wrapper.find('.profile-tags').props().children.type)
        .toEqual('div');
      expect(wrapper.find('.profile-tags').props().children.props.className)
        .toEqual('content');
    });

    it('"content" class element should have 2 children', () => {
      expect(wrapper.find('.content').props().children.length)
        .toEqual(2);
    });

    it('Should test the first child of class "content" element', () => {
      expect(wrapper.find('.content').props().children[0].type)
        .toEqual('div');
      expect(wrapper.find('.content').props().children[0].props.className)
        .toEqual('column tag-buttons');
    });

    it('Class "content" element first child Should render "Subscribed" ' +
      'and "Add more" buttons' , () => {
      expect(wrapper.find('.content').props().children[0].props.children.length)
        .toEqual(2);
      expect(wrapper.find('.content').props().children[0].props.children[0].type)
        .toEqual('button');
      expect(wrapper.find('.content').props().children[1].props.children[0].type)
        .toEqual('button');
      expect(wrapper.find('.content').props().children[0].props.children[0].props.children)
        .toEqual('Subscribed tags');
    });

    it('Should test the second child of class "content" element', () => {
      expect(wrapper.find('.content').props().children[1].type)
        .toEqual('div');
      expect(wrapper.find('.content').props().children[1].props.className)
        .toEqual('column tag-buttons');
    });

    it('Class "content" element second child Should render button ' +
      'for all tags' , () => {
        let elementChildren = wrapper.find('.content').props().children[1]
          .props.children.length;

        expect(elementChildren).toEqual(props.tags.length);
    });
  });
});
