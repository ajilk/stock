import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'


class Dashboard extends Component {
  render() {
    return (
      <>
        <h2>dashboard</h2>
        <h5>{JSON.stringify(firebase.auth().currentUser.uid)}</h5>
      </>
    );
  }
}

export default Dashboard