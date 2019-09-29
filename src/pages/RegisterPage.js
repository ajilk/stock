import React, { Component } from 'react'
import firebase from 'firebase/app'
import { NavLink, Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

class RegisterPage extends Component {
  onRegistered = () => this.props.history.replace('/dashboard')

  render() {
    if (firebase.auth().currentUser) this.props.history.replace('/dashboard')
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
          <RegisterForm onRegistered={this.onRegistered} />
        </div>
      </div >
    );
  }
}

export default RegisterPage