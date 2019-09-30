import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { NavLink, Link } from 'react-router-dom'
import SigninForm from '../components/SigninForm'

class SigninPage extends Component {
  onSignedIn = () => this.props.history.replace('/dashboard')

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.props.history.replace('/dashboard')
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light navbar-expand-lg justify-content-between py-0">
          <NavLink className="navbar-brand" to='/'><h1>stock</h1></NavLink>
          <div>
            <Link to="/"><div className="btn btn-outline light">sign in</div></Link>
            <Link to="/register"><div className="btn btn-outline-secondary">sign up</div></Link>
          </div>
        </nav>
        <div className="container my-5 py-5">
          <SigninForm onSignedIn={this.onSignedIn} />
        </div>
      </div >
    );
  }
}

export default SigninPage