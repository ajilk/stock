import React, { Component } from 'react'
import firebase from 'firebase/app'
import { NavLink, Redirect } from 'react-router-dom'

class Dashboard extends Component {
  signOut = () => {
    firebase.auth().signOut()
  }

  render() {
    if (!firebase.auth().currentUser) return <Redirect to='/' />
    return (
      <div>
        <h1>Dashboard</h1>
        <h5>{JSON.stringify(firebase.auth().currentUser.uid)}</h5>
      </div>
    );
  }
}

export default Dashboard