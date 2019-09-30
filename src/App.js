import './Firebase' // Initialize Firebase
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import SigninPage from './pages/SigninPage'
import DashboardPage from './pages/DashboardPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={SigninPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/dashboard' component={DashboardPage} />
      </BrowserRouter>
    );
  }
}

export default App