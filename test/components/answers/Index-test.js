import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import AnswerStore from '../../../app/js/stores/AnswerStore.js';
import AllAnswers from '../../../app/js/components/answers/Index.react';

describe('Answers All Index', function() {
  var question;
  beforeEach(() => {
    global.$ = {
      isEmptyObject() {
        return false;
      }

    };
    global.Prism = {
      highlightAll() {
        return false;
      }

    };
    question = {
      id: 1
    };
    global.tinymce = {
      init() {
        return 'something';
      }
    };
  });
  it('contains expected class names', () => {
    let answers = shallow(<AllAnswers question={question}/>);
    expect(answers.find('div.sixteen')).to.have.length(1);
    expect(answers.find('.ui')).to.have.length(2);
  });
  it('calls componentDidMount and relevant functions', () => {
    sinon.spy(AllAnswers.prototype, 'componentDidMount');
    sinon.spy(AnswerStore, 'addChangeListener');
    const wrapper = mount(<AllAnswers question={question} />);
    expect(AllAnswers.prototype.componentDidMount.calledOnce).to.be.true;
    expect(AnswerStore.addChangeListener.calledOnce).to.be.true;
    AllAnswers.prototype.componentDidMount.restore();

  });
  it('calls componentWillUnmount and relevant functions', () => {
    sinon.spy(AllAnswers.prototype, 'componentWillUnmount');
    sinon.spy(AnswerStore, 'removeChangeListener');
    const wrapper = mount(<AllAnswers question={question} />);
    wrapper.unmount();
    expect(AllAnswers.prototype.componentWillUnmount.calledOnce).to.be.true;
    expect(AnswerStore.removeChangeListener.calledOnce).to.be.true;
    AllAnswers.prototype.componentWillUnmount.restore();
  });
  it('calls the this.setState in the onChange function', () => {
    let allAnswersComponent = new AllAnswers({question});
    sinon.spy(allAnswersComponent, 'setState');
    allAnswersComponent._onChange();
    expect(allAnswersComponent.setState.calledOnce).to.be.true;
    allAnswersComponent.setState.restore();
  });
  it('calls Common and Prism on initAnswersComponent method', () => {
    let allAnswersComponent = new AllAnswers({question});
    sinon.spy(Prism, 'highlightAll');
    allAnswersComponent.initAnswersComponent();
    expect(Prism.highlightAll.calledOnce).to.be.true;
    Prism.highlightAll.restore();
  });
});