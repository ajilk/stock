import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light navbar-expand-lg justify-content-between py-0">
        <NavLink className="navbar-brand" to='/'><h1>stock</h1></NavLink>
        <div>
          {this.props.signedIn ?
            <button type="submit"
              className="btn btn-block btn-outline-secondary"
              onClick={this.signOut}>sign out
            </button>
            : <>
              <Link to="/"><div className="btn btn-outline light">sign in</div></Link>
              <Link to="/register"><div className="btn btn-outline-secondary">sign up</div></Link>
            </>
          }
        </div>
      </nav>
    );
  }
}

export default Navbar