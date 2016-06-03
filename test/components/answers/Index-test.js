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
  it('contains expected calss name', function() {
    let question = {
      id: 1
    };
    let answers = shallow(<AllAnswers question={question}>
      <div className="sixteen wide answers column"/>
      </AllAnswers>);
      console.log(answers);
    expect(answers.contains(<div className="sixteen wide answers column"/>)).to.equal(true);
  });
});