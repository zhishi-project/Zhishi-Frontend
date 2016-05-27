import React from 'react'
import TagStore from '../../stores/TagStore.js'
import TagActions from '../../actions/TagActions'
import webAPI from '../../utils/webAPI'

require("../../../css/tags.scss")

let getTagState = () => {
  return {
    initialTags: TagStore.getAllTags(),
    tags: []
  }
}

class TagBoxes extends React.Component {
  constructor(props, context){
    super(props)
    this._onChange = this._onChange.bind(this);
    this.state = getTagState();
   }

   componentWillMount(){
    webAPI.processRequest('/tags/recent', 'GET', {}, (tags)=>{
      TagActions.receiveTags(tags)
    });
   }

   componentDidMount() {
     TagStore.addChangeListener(this._onChange);

     this.calcInputWidth()
     $(window).resize(this.calcInputWidth)
     this.componentDidUpdate()

     $(document).bind('click', function(){
       var $clicked = $(event.target);
       if (!$clicked.parents().hasClass("selects") && !$clicked.parents().hasClass("select-tags"))
       $("#tag-list").css('display', 'none')
     });

    $(".select-tags").click(function(){
      $("#tag-list").css('display', 'block')
    })
   }

   componentWillUnmount(){
     TagStore.removeChangeListener(this._onChange);
   }
   componentDidUpdate(){
     $("#tag-list input[type='checkbox']").on('click', function(e){
       var tagBoxes = new TagBoxes;
       tagBoxes.appendSelectedTag(this);
     })
   }

   _onChange() {
     let tags = this.retrieveTagArray(TagStore.getAllTags())
     this.setState({initialTags: tags, tags } )
   }

   retrieveTagArray(tagsObj) {
     let tags = []
      for (var key in tagsObj) {
        tags.push(tagsObj[key].name)
      }
      return tags;
   }

   appendSelectedTag(el){
     var id = $(el).prop('id');
     if ($(el).is(':checked')) {
       if ($(`#${id}Chip`).length == 0) {
         $("#selected-tags").append(`<span id="${id}Chip">${$(el).prop('value')}</span>`);
       }
     } else {
       $(`#${id}Chip`).remove()
     }
     $("input#new-question-tags").val("");
     this.calcInputWidth()
   }

   calcInputWidth() {
     var width = $("#selects").width() - $("#selected-tags").width() - 3;
     $("input#new-question-tags").css('width', width);
   }

   filterList(event){
     var updatedTags = this.state.initialTags;
     updatedTags = updatedTags.filter(function(tag) {
       return (tag.toLowerCase().search(event.target.value.toLowerCase()) != -1)
     })
     this.setState({tags: updatedTags})
   }

   render () {
     var tags = [], checked;
     this.state.tags.forEach((tag) => {
      //  checked = $(`#${tag}Chip`).length > 0 ? true : false;
       tags.push(<li key={tag} className="eight wide column">
                    <input id={tag} type="checkbox" value={tag} />
                    <label htmlFor={tag}>{tag}</label>
                  </li>)
     })
     return (
       <div className="ui row group">
         <div className="sixteen wide mobile two wide tablet two wide computer column column label-wrapper">
           <label>
             Tags:
           </label>
         </div>

         <div className="select-tags sixteen wide mobile fourteen wide tablet fourteen wide computer column">
           <div id="selects" className="selects">
             <span id="selected-tags">
             </span>
             <input id="new-question-tags" type="text" placeholder="amity, food" onChange={this.filterList.bind(this)} />
           </div>

           <div id="tag-list" className="multi-select sixteen wide column">
             <ul className="ui grid">
                {tags}
             </ul>
           </div>

         </div>
       </div>

     )
   }
 }

 export default TagBoxes
