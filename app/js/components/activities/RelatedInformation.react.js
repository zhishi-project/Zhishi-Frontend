import React from 'react'
import Common from "../../utils/Common.js"

const RelatedInformation = ({ relatedInformation }) => {
  let permalink = Common.createPermalink(relatedInformation.id, relatedInformation.title);
  let type = relatedInformation.type ? relatedInformation.type.toLowerCase() : 'info'
  return (
    <div className="content">
      <div className="summary">
          The {type}
      </div>

      <div className="extra text">
        <a href={`/questions/${permalink}`}>{relatedInformation.title}</a>
      </div>
      <div className="meta">
        <a className="like">
          <i className="terminal icon"></i> {Common.sanitizeString(relatedInformation.content)}
        </a>
      </div>
    </div>
  )
}
export default RelatedInformation
