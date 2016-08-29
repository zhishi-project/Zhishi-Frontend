import React from 'react';

let signUpPath = 'http://zhishi-engine.herokuapp.com/login/google?redirect_url=http://localhost:8080/login/auth';

class Index extends React.Component {
  constructor(props, context) {
    super(props);
  }

  signIn() {
    let path = '/login/google?redirect_url=http://localhost:8080/login/auth';
    window.location.href = signUpPath;
  }

  render() {
    return (
      <div className="index center aligned ui container full-height">
        <section className="header">
          <header>
            <div className="logo-container">
              Anything
            </div>
          </header>
        </section>
      </div>
    );
  }
}

module.exports = Index;
