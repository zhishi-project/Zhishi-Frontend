import React from 'react'

require("../../../css/tags.scss")

let getTagState = () => {
  return(['success', 'operations', 'societies', 'rails', 'Javascript', 'sales', 'available-fellows', 'python', 'amity']);
}

class TagBoxes extends React.Component {
  constructor(props, context){
    super(props)
    this.state = {initialTags: getTagState(), tags:[] }
   }

   componentWillMount(){
    this.setState({tags: this.state.initialTags})
   }

   componentDidMount() {
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

   componentDidUpdate(){
     $("#tag-list input[type='checkbox']").on('click', function(e){
       var tagBoxes = new TagBoxes;
       tagBoxes.appendSelectedTag(this);
     })
   }

   appendSelectedTag(el){
     var id = $(el).prop('id');
     debugger;
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
     var tags = []
     this.state.tags.forEach((tag) => {
       tags.push(<li key={tag} className="eight wide column">
                    <input id={tag} type="checkbox" value={tag} />
                    <label htmlFor={tag}>{tag}</label>
                  </li>)
     })
     return (
       <div className="ui row group">
         <div className="two wide column label-wrapper">
           <label>
             Tags:
           </label>
         </div>

         <div className="select-tags fourteen wide column">
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
