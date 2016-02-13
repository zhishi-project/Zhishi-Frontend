import React from 'react'

class AllAnswers extends React.Component {
  constructor(props, context){
    super(props)
   }

   render () {
     var answer = this.props.answer || {};
     var user = answer.user || {};
     var answer_date = new Date(answer.created_at)
     return (
       <div className="row answer-comment">
         <div className="two wide column">
           <div className="rate-up"></div>
           <div className="rate-count">{answer.points || 0}</div>
           <div className="rate-down"></div>
         </div>

         <div className="fourteen wide column">
           <div className="main-comment">
             <div dangerouslySetInnerHTML={{__html: answer.content}} />
           </div>

            <div className="user-metadata clearfix">
             <p className="time-ago">
               Answered {answer_date.toDateString() || "(no date )"}
             </p>

             <div className="two equal width ui grid">
               <div className="fourteen wide column">
                 <p className="user-fullname">
                   Innocent T. Amadi
                   <span className="badges">
                     {user.points || 0}
                   </span>
                 </p>
               </div>

               <div className="two wide column">
                 <img src={ user.image || "/assets/img/profile.jpg"} alt="profile-image" className="profile-img" />
               </div>
             </div>
           </div>
         </div>
       </div>
     )
   }
 }
 module.exports = AllAnswers;
