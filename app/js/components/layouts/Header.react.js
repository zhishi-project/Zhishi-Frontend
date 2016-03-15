import React from 'react'
import SearchBar from './SearchBar.react'
import Common from '../../utils/Common.js'
import AuthStore from '../../stores/AuthStore.js'

class Header extends React.Component {
  constructor (props, context) {
    super(props)
  }

  componentDidMount() {
    $(".ui.dropdown").dropdown();
    $(".share-popup").popup();
  }

  render() {
    var current_user = AuthStore.getCurrentUser() || {};
    var permalink = Common.createPermalink(current_user.id, current_user.name)
    var heading_helper_text = '<div class=header-text><span>Zhishi</span> means <span>Knowledge</span> in chinese</div>'
    return (
      <header>
        <nav className="navigation">
          <div className="ui menu">
            <div className="ui container">
              <div className="item logo-wrapper">
                <a href="/" className="share-popup" data-html={heading_helper_text} data-variation="very wide">
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
                    <a href={`/users/${permalink}`} className="item"><i className="user icon"></i> Profile</a>
                    <a href="#" className="item"><i className="setting icon"></i> Settings</a>
                    <a href="/logout" className="item"><i className="privacy icon"></i> Log out</a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </nav>

        <SearchBar />
      </header>
    )
  }
}
module.exports = Header;
