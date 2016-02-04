import React from 'react'

class Index extends React.Component {
  constructor(props, context) {
    super(props);
  }

  render(){
    return (
      <div className="index center aligned ui container full-height">
        <section className="header">
          <header>
            <div className="logo-container">
              Here will lie the question index page
            </div>
          </header>
        </section>
      </div>
    )
  }
}
module.exports = Index;
