import React from 'react'
import TagStore from '../../stores/TagStore'
import TagActions from '../../actions/TagActions'
import webAPI from '../../utils/webAPI'
import _ from 'jquery'

let getTagState = () => {
  let tags = TagStore.getAllTags();
  if (_.isEmptyObject(tags)) {
    webAPI.processRequest('/tags/recent', 'GET', {}, TagActions.receiveTags);
  }
  return { tags }
}

let index=0, options = [
  'nightlife', 'sports', 'abstract',
  'city', 'people', 'transport',
  'food', 'nature', 'business'
];


class Tag extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { tag, _onTagClick } = this.props;
    index = (index >= options.length) ? 0 : index + 1
    return (
      <div className={`tag ${tag.status}`}  >
        <div className="overlay">
          <i className="heart icon" data-tag-id={tag.id} />
        </div>
        {/*<img src={`http://lorempixel.com/150/150/${options[index]}`} />*/}
        <img src="/assets/img/profile.jpg" />
        <p className="desc">
          {tag.name}
        </p>
      </div>
    )
  }
}


class Modal extends React.Component {
  constructor (props) {
    super(props);
    this.state = getTagState();
  }

  componentDidMount() {
    TagStore.addChangeListener(this._onChange.bind(this));
    $(document).on('click', ".tag .overlay", function() {
      let tag_id = $(event.target).data('tag-id');
      TagActions.selectTagForSubscription(tag_id);
    })
  }

  componentWillUnmount() {
    TagStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState( getTagState() )
  }

  _onTagClick(tag_id) {
    debugger;

  }

  render () {
    let view_tags = [], keys = [];
    const { tags } = this.state;
    if (!_.isEmptyObject(tags)) {
      keys = Object.keys(tags)
      for (let i=0; i < keys.length; i++) {
        // let boundClick = this._onTagClick.bind(this, i)
        view_tags.push(
          <Tag
            key={i}
            tag={tags[keys[i]] }
            _onTagClick={this._onTagClick}
          />
        )
      }
    }
    return (
      <div className="ui modal">
        <div className="header">
          <h4>
            Choose tags that are important to you
          </h4>
          <p>
            So we can make your feed more . . . personal!
          </p>
        </div>
        <div className="main content">
          <div className="ui grid container">
           {view_tags}
          </div>
        </div>

        <div className="actions">
          <a href="#" disabled>
            Select 3 more tags
          </a>
        </div>
      </div>
    )
  }
}

export default Modal;
