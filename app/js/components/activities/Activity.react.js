import React from 'react'
import Common from "../../utils/Common.js"
import RelatedInformation from './RelatedInformation.react'

const Activity = ({ activity, user, pronoun}) => {
  const { activity_on } = activity
  let permalink = Common.createPermalink(activity_on.id, activity_on.title);
  let relatedInformation = $.isEmptyObject(activity_on.related_information) ? ""
    : <RelatedInformation relatedInformation={activity_on.related_information} />
  let iconTypes = { comment: 'comment', question: 'terminal', answer: 'write'}
  let content = Common.elipsize(Common.sanitizeString(activity_on.content), 200);

  return (

      <div className="event">
        <div className="label">
          <i className={`${iconTypes[activity_on.type.toLowerCase()]} icon`}></i>
          {/*}<img src={user.image} />*/}
        </div>
        <div className="content">
          <div className="summary">
              {pronoun} {activity.display_message.toLowerCase()}
            <div className="date">
              {activity_on.created_since}
            </div>
          </div>
          <div className="extra text">
            <a href={`/questions/${permalink}`}>{activity_on.title}</a>
          </div>
          <div className="meta">
            <a className="like">
               {content}
            </a>
          </div>

          {relatedInformation}

        </div>
      </div>
  )
}
export default Activity;
