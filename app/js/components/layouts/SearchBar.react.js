import React from 'react'
import QuestionStore from '../../stores/QuestionStore.js'
import Common from '../../utils/Common.js'

let searchBarState = () => {
  return {
    initial_questions: {},
    questions: []
  }
}

var search_results;
var initial_questions;
class SearchBar extends React.Component {
  constructor(props, context){
    super(props)
    this.state = searchBarState()
   }

   componentDidMount() {
     this.resizeSearchBar();
     $(window).resize(this.resizeSearchBar)
     this.setState({initial_questions: QuestionStore.getQuestions()})
   }

   search(event) {
     var search_results;
     if (event.target.value != '') {
       initial_questions = initial_questions ? initial_questions : this.questionsToSearch();
       var search_results = initial_questions, value, title;
       search_results = search_results.filter(function(question) {
         value = event.target.value.toLowerCase(), title = question.title.toLowerCase();
         return value.length > 2 ? (title.search(value) != -1) : (title.substring(0, value.length) == value)
       });
     } else {
       search_results = []
     }
     this.setState({questions: search_results})
   }

   resizeSearchBar(){
     var total_width = $(".search-area.ui.container").width();
     var search_width = total_width - $("#askQuestion").width() - 52;
     $(".search-area form").css('width', search_width);
     $("#searchResults").css('width', $(".search-area .ui.input").width() - 4)
   }

   questionsToSearch() {
     var questions =  QuestionStore.getQuestions();
     var keys = Object.keys(questions), questions_array =[], question;
     keys.map(function(key) {
       question = questions[key];
       question = {id: question.id, title: question.title}
       questions_array.push(question)
     })
     return questions_array;
   }

   render () {
     var questions = this.state.questions, question, search_results = [], keys, url, hide_class;
     if (!$.isEmptyObject(questions)) {
       keys = Object.keys(questions)
       for (var i = keys.length - 1; i >= 0; i--) {
         question = questions[keys[i]];
         url = `http://${window.location.host + window.location.pathname}/${Common.createPermalink(question.id, question.title)}`
         search_results.push(<li key={i}><a href={url}>{question.title}</a></li>)
         if (i > 8) { break; }
       }
     } else {
       hide_class = "hide"
     }
     return (
       <div className="search-area ui container">
         <form action="/search" method="GET" className="ui search">
           <div className="ui icon input">
             <input type="text" className="prompt" placeholder="Check if someone's asked that..." onChange={this.search.bind(this)} />
             <i className="search icon"></i>
           </div>
           <button className="search ui button" type="submit">
             Search
           </button>
         </form>
         <a id="askQuestion" href="/questions/new" className="ui button">
         Ask a Question
         </a>
         <div id="searchResults" className={hide_class}>
            <ul>
              {search_results}
            </ul>
         </div>
       </div>
     )
   }
 }

 export default SearchBar
