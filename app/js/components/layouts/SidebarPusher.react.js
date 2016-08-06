import React from "react";
import Auth from '../../auth';

const SidebarPusher = ({current_user}) => {
  $('.sidebar-icon').click(function() {
    $('.ui.sidebar').sidebar('toggle');
  });
  var current_user = Auth.getCurrentUser() || {};
  return (
    <div className="ui left demo vertical inverted sidebar labeled icon menu">
      <a className="item">
        <i className="tags icon"></i>
        Tags
      </a>
      <a className="item">
        <i className="help icon"></i>
        Help
      </a>
      <a className="item">
        <img src={current_user.image || '/assets/img/avatar.png'} alt="user-profile-image" className="profile-img" />
        My profile
      </a>
      <a href="/logout" className="item">
        <i className="privacy icon"></i>
        Log out
      </a>

    </div>
  );
};
export default SidebarPusher;
