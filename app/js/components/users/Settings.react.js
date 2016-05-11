import React from 'react';

const SettingsSection = (props) => {
  return (
    <aside className="four wide computer only column">
      <div className="sidebar wide column row">
      <h2 className="headers"> Settings</h2>
      <div className="ui divider"></div>
        <div className="ui grid two column row settings">
        <div className="column">
        <label>Notifications: </label>
        </div>
        <div className="column">
          <div className="ui test toggle checkbox">
            <input type="checkbox" />
            <label></label>
          </div>
          </div>
        </div>
      <div className="ui divider"></div>
      <div className="ui grid  two column row settings">
        <div className="column">
        <label>Newsletter: </label>
        </div>
        <div className="column">
          <div className="ui test toggle checkbox">
            <input type="checkbox"/>
            <label></label>
          </div>
          </div>
        </div>
        <div className="ui divider"></div>

      </div>
  </aside>
  );
};

export default SettingsSection;