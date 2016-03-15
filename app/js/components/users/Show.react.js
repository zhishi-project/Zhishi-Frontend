import React from 'react'
import Header from '../layouts/Header.react'
import Footer from '../layouts/Footer.react'
import UserActions from '../../actions/UserActions.js'
import UserStore from '../../stores/UserStore.js'
import AuthStore from '../../stores/AuthStore.js'
import webAPI from '../../utils/webAPI.js'

function getUserState(user_id){
  if (user_id) {
    webAPI.processRequest(`/users/${user_id}`, 'GET', user_id, UserActions.receiveUser);
  }
  return {
    user: UserStore.getUser(user_id),
    current_user: AuthStore.getCurrentUser()
  }
}

class Show extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getUserState(props.user_id);
  }

  componentDidMount(){
    UserStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    UserStore.removeChangeListener(this._onChange).bind(this);

  }
  _onChange() {
    this.setState(getUserState(this.props.user_id))
  }
  render(){
    let current_user = this.state.current_user;
    let user = this.state.user || {};
    return (
      <div>
        <Header />

        <main className="ui container main">
          <div className="ui stackable grid">

              <div className="five wide column">
                <div className="ui card">
                  <div className="image">
                    <img src={current_user.image || "/assets/img/profile.jpg"} alt="Profile" />
                  </div>

                  <div className="content">
                    Reputation: {current_user.points}
                  </div>
                </div>
              </div>

              <div className="seven wide column">
                <h3>
                  {current_user.name}
                </h3>
                <p>
                  Thanks for using Zhishi. . We are definitely working on making this page more useful. . And shortly, hopefully, it will.
                </p>
              </div>

              <div className="three wide column">
                <h3>
                  Stats
                </h3>
                <p>
                  Member since {user.created_at}
                </p>

                <p>
                  3 Profile views
                </p>

                <p>
                  2 Questions asked
                </p>

                <p>
                  5 questions answered
                </p>
              </div>


          </div>
        </main>
        <Footer />

      </div>
    )
  }
}

module.exports = Show;
