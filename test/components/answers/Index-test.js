import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import AllAnswers from '../../../app/js/components/answers/Index.react';

describe('Answers All Index', function() {
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
  });
  it('contains expected class names', function() {
    let question = {
      id: 1
    };
    let answers = shallow(<AllAnswers question={question}/>);
    expect(answers.find("div.sixteen")).to.have.length(1);
    expect(answers.find(".ui")).to.have.length(2);
   // expect(answers.find("h4.ui")).to.have.length(1);


  });
});