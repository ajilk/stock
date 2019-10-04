import './Firebase' // Initialize Firebase
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import RegisterPage from './pages/Register.page'
import SigninPage from './pages/Signin.page'
import PortfolioPage from './pages/Portfolio.page'

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={SigninPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/portfolio' component={PortfolioPage} />
      </Router>
    );
  }
}

export default App