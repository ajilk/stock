import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'
import UserModel from '../models/User.model'


export default class RegisterForm extends Component {
  state = {
    email: '',
    password: '',
    verifyPassword: ''
  }

  onEmailChange = (e) => this.setState({ email: e.target.value });
  onPasswordChange = (e) => this.setState({ password: e.target.value })
  onVerifyPasswordChange = (e) => this.setState({ verifyPassword: e.target.value })

  register = () => {
    firebase.auth().createUserWithEmailAndPassword(
      this.state.email, this.state.password)
      .then(() => {
        var newUser = new UserModel(5000);
        const db = firebase.firestore()
        const uid = firebase.auth().currentUser.uid
        db.collection("users").doc(uid).set(Object.assign({}, newUser))
        this.props.onRegistered()
      }).catch(error => console.log(`${error.code}: ${error.message}`));
  }

  render() {
    if (firebase.auth().currentUser) { return <Redirect to='/dashboard' /> }
    return (
      <div className="container p-5 text-center" >
        <h2>hello</h2>
        {this.state.reply}
        <div className="row justify-content-center">
          <div className="col-lg-4 col-12">
            <div className="form-group">
              <input onChange={this.onEmailChange} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="email" />
            </div>
            <div className="form-group">
              <input onChange={this.onPasswordChange} type="password" className="form-control" id="passwordInput" placeholder="password" />
            </div>
            <div className="form-group">
              <input onChange={this.onVerifyPasswordChange} type="password" className="form-control" id="passwordVerifyInput" placeholder="verify password" />
            </div>
            <button type="submit" className="btn btn-block btn-outline-secondary" onClick={this.register}>create account</button>
          </div>
        </div>
      </div>
    )
  }
}