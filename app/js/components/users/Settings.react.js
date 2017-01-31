import React, {PropTypes} from 'react';

class SettingsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slackToggle: true
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    const value = event.target.checked;
    this.setState({slackToggle: value});
  }

  render() {
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
              <input type="checkbox" onChange={this.handleToggle}
                defaultChecked={this.state.slackToggle}/>
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
              <input type="checkbox" disabled/>
              <label></label>
            </div>
            </div>
          </div>
          <div className="ui divider"></div>

        </div>
      </aside>
    );
  }
}

SettingsSection.propTypes({
  userActions: PropTypes.object,
  currentUser: PropTypes.object,
  user: PropTypes.object,
  activities: PropTypes.array
});

export default SettingsSection;
