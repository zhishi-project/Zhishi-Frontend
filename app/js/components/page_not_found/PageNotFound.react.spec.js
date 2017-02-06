import PageNotFound  from './PageNotFound.react';
import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

function setUp() {
  
  return shallow(<PageNotFound />);
}

describe('< PageNotFound/>', () => {
	it ('assert 404 is displayed',() => {
		expect(setUp().find('#number').text()).toEqual(' 404');
	})
}) 