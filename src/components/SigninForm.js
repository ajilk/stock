import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'

class SigninForm extends Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChange = (e) => this.setState({ email: e.target.value });
  onPasswordChange = (e) => this.setState({ password: e.target.value })

  signIn = () => {
    firebase.auth().signInWithEmailAndPassword(
      this.state.email, this.state.password)
      .then(() => this.props.onSignedIn())
      .catch(error => {
        switch (error.code) {
          case 'auth/wrong-password': console.log('wrong password'); break;
          case 'auth/user-not-found': console.log('user not found'); break;
          default: console.log(`${error.code}: ${error.message}`); break;
        }
      })
  }

  render() {
    return (
      <div className="container p-5 text-center" >
        <h2>welcome back</h2>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-12">
            <div>
              <div className="form-group">
                <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="email" onChange={this.onEmailChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="passwordInput" placeholder="password" onChange={this.onPasswordChange} />
              </div>
              <button type="submit" className="btn btn-block btn-outline-secondary" onClick={this.signIn}>sign in</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SigninForm