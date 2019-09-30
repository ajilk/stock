import './Firebase' // Initialize Firebase
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import SigninPage from './pages/SigninPage'
import DashboardPage from './pages/DashboardPage'

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={SigninPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/dashboard' component={DashboardPage} />
      </Router>
    );
  }
}

export default App