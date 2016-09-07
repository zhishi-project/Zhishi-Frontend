import React from 'react';
import TagStore from '../../../stores/TagStore.js';
import * as TagActions from '../../../actions/TagActions.js';
import $ from 'jquery';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import assign from 'object-assign';

let getTagState = (tags, selectedTags = []) => {
  return {
    tags,
    selectedTags,
    typedText: ''
  };
};

class TagBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = getTagState(this.props.initialTags);
    this.filterList = this.filterList.bind(this);
    this.clickTag = this.clickTag.bind(this);
  }

   componentWillMount() {
     this.props.actions.loadTags();
   }

   componentDidMount() {
     this.calcInputWidth();
     $(window).resize(this.calcInputWidth);

     $(document).bind('click', function() {
       var $clicked = $(event.target);
       if (!$clicked.parents().hasClass('selects') &&
       !$clicked.parents().hasClass('select-tags'))
         $('#tag-list').css('display', 'none');
     });

     $('.select-tags').click(function() {
       $('#tag-list').css('display', 'block');
     });
   }

   componentDidUpdate() {
     this.calcInputWidth();
   }

   clickTag(event) {
     const {selectedTags} = this.state;
     let clickedTag = event.target.textContent;
     let tags = selectedTags.indexOf(clickedTag) === -1 ?
       [...selectedTags, clickedTag] :
       selectedTags.filter(tag => tag !== clickedTag);
     this.props.onUpdateTags(tags);
     this.setState(getTagState(this.props.initialTags, tags));
   }

   addTag(selectedTags, clickedTag) {
     this.setState({
       selectedTags: [...selectedTags, clickedTag]
     });
   }

   deleteTag(selectedTags, clickedTag) {
     this.setState({
       selectedTags:
       selectedTags.filter(tag => tag !== clickedTag)
     });
   }

   calcInputWidth() {
     var width = $('#selects').width() - $('#selected-tags').width() - 3;
     $('input#new-question-tags').css('width', width);
   }

   filterList(event) {
     const {initialTags} = this.props;
     let typedText = event.target.value.toLowerCase();
     let tags = initialTags.filter(function(tag) {
       return (tag.toLowerCase().search(typedText) !== -1);
     });
     this.setState({tags, typedText});
   }

   render() {
     let tagsArr = [];
     let checked;
     const {selectedTags, tags, typedText} = this.state;
     if (typedText !== '') {
       tags.forEach(tag => {
         checked = selectedTags.indexOf(tag) !== -1;
         tagsArr.push(
            <li key={tag}
              onClick={this.clickTag}
              className="eight wide column">
                <input
                  type="checkbox"
                  checked={checked}
                  value={tag} />
              <label htmlFor={tag}>{tag}</label>
            </li>);
       });
     }
     return (
       <div className="ui row group">
         <div className="sixteen wide mobile \
           two wide tablet two wide computer column label-wrapper">
           <label>
             Tags:
           </label>
         </div>

         <div className=" sixteen wide mobile \
           fourteen wide tablet fourteen wide computer column select-tags">
           <div id="selects" className="selects">
             <span id="selected-tags">
               {selectedTags && selectedTags.map(tag => {
                 return <span key={`${tag}-chip`}>
                   {tag}</span>;
               })}
             </span>
             <input ref="tagInput"
               id="new-question-tags"
               type="text"
               value={typedText}
               placeholder="amity, food" onChange={this.filterList} />
           </div>

           <div id="tag-list" className="multi-select sixteen wide column">
             <ul className="ui grid">
                {tagsArr}
             </ul>
           </div>

         </div>
       </div>

     );
   }
 }

function retrieveTagArray(tagsObj) {
  let tags = [];
  for (let key in tagsObj) {
    tags.push(tagsObj[key].name);
  }
  return tags;
}

 /**
 * @param {Object} state: from root reducer
 * @param {Object} ownProps: for functions
 * @return {Object}  {questions, filteredQuestions, page} for homepage
 */
function mapStateToProps(state, ownProps) {
  return {
    initialTags: retrieveTagArray(state.tags.tags),
    onUpdateTags: ownProps.onUpdateTags
  };
}

 /**
 * @param {Func} dispatch: from root reducer
 * @return {Object}  actions to be bound
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TagActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagBoxes);
