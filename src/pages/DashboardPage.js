import React, { Component } from 'react'
import firebase from 'firebase/app'
import { NavLink, Redirect } from 'react-router-dom'
import Dashboard from '../components/Dashboard'

class DashboardPage extends Component {
  signOut = () => {
    firebase.auth().signOut()
      .then(() => this.props.history.replace('/'))
  }

  render() {
    if (!firebase.auth().currentUser) return <Redirect to='/' />
    return (
      <div>
        <nav className="navbar navbar-light navbar-expand-lg justify-content-between py-0">
          <NavLink className="navbar-brand" to='/'><h1>stock</h1></NavLink>
          <div>
            <button type="submit"
              className="btn btn-block btn-outline-secondary"
              onClick={this.signOut}>sign out
            </button>
          </div>
        </nav>
        <div className="container my-5 py-5">
          <Dashboard />
        </div>
      </div >
    );
  }
}

export default DashboardPage