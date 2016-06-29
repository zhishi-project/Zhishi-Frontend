import React from 'react'

const InsufficientPoints = ({ currentUser, requiredPoints }) => {
    let pointsLeft = requiredPoints - currentUser.points;
    return <div>
            <div className="header">
              Uh oh. . You need just {pointsLeft} more points! <br />
            </div>
            <p>Seems you don't yet have up to {requiredPoints} points yet. You could win some by:</p>
            <ul className="list">
              <li>Asking questions others could find helpful.</li>
              <li>Contributing answers and comments others will bless you for.</li>
            </ul>
          </div>
  }

export default InsufficientPoints;
