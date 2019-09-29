import './Firebase' // Initialize Firebase
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Link, Redirect } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import SigninPage from './pages/SigninPage'
import DashboardPage from './pages/DashboardPage'
import firebase from 'firebase/app'
import 'firebase/auth'

class App extends Component {
  render() {
    if (firebase.auth().currentUser) return <Redirect to='/' />
    return (
      <Router>
        <Route path='/' exact component={SigninPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/dashboard' component={DashboardPage} />
      </Router>
    );
  }
}

export default App