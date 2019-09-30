import React, { Component } from 'react'
import firebase from 'firebase/app'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1 class="text-center">Dashboard</h1>
        <h5>{JSON.stringify(firebase.auth().currentUser.uid)}</h5>
      </div>
    );
  }
}

export default Dashboard