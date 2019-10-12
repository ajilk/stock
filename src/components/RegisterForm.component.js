import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'
import UserModel from '../models/User.model'

export default class RegisterForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: ''
  }

  onEmailChange = (e) => this.setState({ email: e.target.value });
  onPasswordChange = (e) => this.setState({ password: e.target.value })
  onVerifyPasswordChange = (e) => this.setState({ verifyPassword: e.target.value })
  onFirstNameChange = (e) => this.setState({ firstName: e.target.value });
  onLastNameChange = (e) => this.setState({ lastName: e.target.value });

  register = () => {
    const { firstName, lastName, email, password } = this.state
    firebase.auth().createUserWithEmailAndPassword(
      email, password)
      .then(() => {
        const newUser = new UserModel(firstName, lastName, 5000.0);
        const db = firebase.firestore()
        const uid = firebase.auth().currentUser.uid
        db.collection("users").doc(uid).set(Object.assign({}, newUser))
        this.props.onRegistered()
      }).catch(error => console.log(`${error.code}: ${error.message}`));
  }

  render() {
    if (firebase.auth().currentUser) { return <Redirect to='/portfolio' /> }
    return (
      <div className="container p-5 text-center" >
        <h2>hello</h2>
        {this.state.reply}
        <div className="row justify-content-center">
          <div className="col-lg-5 col-12">
            <div className="form-row">
              <div className="form-group col-lg-6">
                <input onChange={this.onFirstNameChange} type="text" className="form-control" id="firstNameInput" aria-describedby="firstNameHelp" placeholder="First Name" />
              </div>
              <div className="form-group col-lg-6">
                <input onChange={this.onLastNameChange} type="text" className="form-control" id="lastNameInput" aria-describedby="lastNameHelp" placeholder="Last Name" />
              </div>
            </div>
            <div className="form-group">
              <input onChange={this.onEmailChange} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Email" />
            </div>
            <div className="form-group">
              <input onChange={this.onPasswordChange} type="password" className="form-control" id="passwordInput" placeholder="Password" />
            </div>
            <div className="form-group">
              <input onChange={this.onVerifyPasswordChange} type="password" className="form-control" id="passwordVerifyInput" placeholder="Verify Password" />
            </div>
            <button type="submit" className="btn btn-block btn-outline-secondary" onClick={this.register}>create account</button>
          </div>
        </div>
      </div>
    )
  }
}