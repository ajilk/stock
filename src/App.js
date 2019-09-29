import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Link } from 'react-router-dom'
import Register from './components/register.component.js'
import Signin from './components/signin.component.js'

class App extends Component {
  navbar = (
    <nav className="navbar navbar-light navbar-expand-lg justify-content-between py-0">
      <NavLink className="navbar-brand" to='/'><h1>stock</h1></NavLink>
      <div>
        <Link to="/"><div className="btn btn-outline light">sign in</div></Link>
        <Link to="/register">
          <div className="btn btn-outline-secondary">sign up</div>
        </Link>
      </div>
    </nav>
  );

  render() {
    return (
      <Router>
        {this.navbar}
        <div className="container my-5 py-5">
          <Route path='/' exact component={Signin} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
    );
  }
}

export default App