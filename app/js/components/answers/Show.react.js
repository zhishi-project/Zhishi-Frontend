import React from 'react'

class AllAnswers extends React.Component {
  constructor(props, context){
    super(props)
   }

   render () {
     return (
       <div className="row answer-comment">
         <div className="two wide column">
           <div className="rate-up"></div>
           <div className="rate-count">3000</div>
           <div className="rate-down"></div>
         </div>

         <div className="fourteen wide column">
           <div className="main-comment">
             <p>
               Hi Uzo
             </p>

             <p>
               Go and hug a transformer in the <strong>forbidden forest of Ikuku,</strong> that is the only way this issue of yours
               can be correctly resolved.
             </p>

             <p>
               If that doesnt work then you would have to drink water that has been used to wash the head of a bald man as that is another way that you can resolve the atm issue.
             </p>

             <p>
              Good luck.
             </p>
           </div>

            <div className="user-metadata clearfix">
             <p className="time-ago">
               Answered 2 Hours ago
             </p>

             <div className="two equal width ui grid">
               <div className="fourteen wide column">
                 <p className="user-fullname">
                   Innocent T. Amadi
                   <span className="badges">
                     90
                   </span>
                 </p>
               </div>

               <div className="two wide column">
                 <img src="/assets/img/profile.jpg" alt="profile-image" className="profile-img" />
               </div>
             </div>
           </div>
         </div>
       </div>
     )
   }
 }
 module.exports = AllAnswers;
