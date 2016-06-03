import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import AuthStore from '../../../app/js/stores/AuthStore.js';
import AllAnswers from '../../../app/js/components/answers/Show.react';

describe('Answers All Show Index', function() {
  var question;
  beforeEach(() => {
    global.$ = () => {
      return {
        click: () => 'click',
        popup: () => 'popup'
      };
    };
    global.Prism = {
      highlightAll() {
        return false;
      }

    };
    question = {
      id: 1
    };
    global.Clipboard = x => {
      return 'clipBoard +' + x;
    };
    global.tinymce = {
      init() {
        return 'something';
      }
    };

    sinon.stub(AuthStore, 'getCurrentUser').returns({});
  });
  afterEach(() => {
    AuthStore.getCurrentUser.restore();
  });
  it('check for the number of classes the component has to verify', () => {
    let answers = shallow(<AllAnswers question={question}/>);
    expect(answers.find('div.fourteen')).to.have.length(2);
    expect(answers.find('.time-ago')).to.have.length(1);
  });
  it('calls componentDidMount and relevant functions', () => {
    sinon.spy(AllAnswers.prototype, 'componentDidMount');
    const wrapper = mount(<AllAnswers question={question} />);
    expect(AllAnswers.prototype.componentDidMount.calledOnce).to.be.true;
    AllAnswers.prototype.componentDidMount.restore();

  });
});
