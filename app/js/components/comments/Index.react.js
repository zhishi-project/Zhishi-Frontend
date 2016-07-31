import React from 'react';
import CommentShow from './Show.react';
import NewComment from './New.react';
import * as CommentActions from '../../actions/CommentActions.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class AllComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showNewForm: false};
  }

   getAllComments() {
     let AllComments = [];
     const {comments, meta, actions} = this.props;
     if (comments && !Object.is(comments, {})) {
       for (let key in comments) { // eslint-disable-line guard-for-in
         AllComments.push(<CommentShow
                            key={key}
                            meta={meta}
                            comment={comments[key]}
                            actions={actions} />);
       }
     }
     return AllComments;
   }

   render() {
     const {newComment, meta} = this.props;
     return (
       <div className="ui minimal comments">

         <div className="ui dividing header"></div>

         {this.getAllComments()}

         <NewComment
           comment={newComment}
           meta={meta}
           showNewForm={this.state.showNewForm}
           actions={this.props.actions} />

       </div>
     );
   }
 }

 /**
 * @param {Object} meta: for this specific comment list
 * @param {Object} state: from root reducer
 * @return {Object}  {comments} for page
 */
function getComments(meta, state) {
  let comments = state.comments[meta.resourceName][meta.resourceId];
  return comments ? comments : {};
}

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {comments} for page
*/
function mapStateToProps(state, ownProps) {
  const newComment = {content: ''};
  return {
    comments: getComments(ownProps.meta, state),
    newComment
  };
}

/**
* @param {Func} dispatch action
* @return {Object}  actions as props having the dispatch property
*/
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CommentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllComments);
