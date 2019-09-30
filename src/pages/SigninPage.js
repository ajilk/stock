import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Link, Redirect } from 'react-router-dom'
import SigninForm from '../components/SigninForm'

class SigninPage extends Component {
  onSignedIn = () => this.props.history.replace('/dashboard')

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.props.history.replace('/dashboard')
    });
  }

  render() {
    if (firebase.auth().currentUser) return <Redirect to='/dashboard' />
    return (
      <div>
        <nav className="navbar navbar-light navbar-expand-lg justify-content-between py-0">
          <Link className="navbar-brand" to='/'><h1>stock</h1></Link>
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