import React from 'react'
import AuthStore from '../../stores/AuthStore.js'


class Header extends React.Component {
  constructor (props, context) {
    super(props)
  }

  componentDidMount() {
    $(".ui.dropdown").dropdown();
  }

  render() {
    var current_user = AuthStore.getCurrentUser() || {};
    return (
      <header>
        <nav className="navigation">
          <div className="ui menu">
            <div className="ui container">
              <div className="item logo-wrapper">
                <a href="/">
                  <img src="/assets/img/logo-header.png" alt="zhishi-logo" className="logo" />
                </a>
              </div>

              <div className="right menu">
                <a href="#" className="item">Tag</a>
                <a href="#" className="item">Users</a>
                <a href="#" className="item">Help</a>
                <div className="pointing ui dropdown item">
                  <img src={current_user.image || "/assets/img/profile.jpg"} alt="user-profile-image" className="profile-img" />
                  <i className="dropdown icon"></i>

                  <div className="menu">
                    <a href="/users" className="item"><i className="user icon"></i> Profile</a>
                    <a href="#" className="item"><i className="setting icon"></i> Settings</a>
                    <a href="/logout" className="item"><i className="privacy icon"></i> Log out</a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </nav>

        <div className="search-area ui container">
          <form action="#" method="POST" className="ui search">
            <div className="ui icon input">
              <input type="text" className="prompt" placeholder="Enter search query" required />
              <i className="search icon"></i>
            </div>
            <button className="search ui button" type="submit">
              Search
            </button>
            <a href="/questions/new" className="ui button">
              Ask a Question
            </a>
          </form>
        </div>
      </header>
    )
  }
}
module.exports = Header;
