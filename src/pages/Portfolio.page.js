import React, { Component } from 'react'
import firebase from 'firebase/app'
import { Redirect, Link } from 'react-router-dom'
import DashboardTab from './portfolio.tabs/Dashboard.tab'
import TransactionsTab from './portfolio.tabs/Transactions.tab'
import BuyTab from './portfolio.tabs/Buy.tab'

class PortfolioPage extends Component {
  state = {
    currentTab: 'dashboard'
  }
  signOut = () => {
    firebase.auth().signOut()
      .then(() => this.props.history.replace('/'))
  }

  setTab = (e) => this.setState({ currentTab: e.target.id });

  render() {
    if (!firebase.auth().currentUser) return <Redirect to='/' />
    let currentTab
    switch (this.state.currentTab) {
      case 'dashboard': currentTab = <DashboardTab />; break
      case 'transactions': currentTab = <TransactionsTab />; break
      case 'buy': currentTab = <BuyTab />; break
      default: currentTab = <DashboardTab />
    }
    return (
      <div>
        <nav className="navbar navbar-light navbar-expand-lg justify-content-between py-0">
          <Link className="navbar-brand" to='/'><h1 className="my-0 align-center">stock</h1></Link>
          <div className="btn-group" role="group">
            <div className="btn-group" role="group">
              <button className="btn btn-outline-dark dropdown-toggle" data-toggle="dropdown" type="button">{this.state.currentTab}</button>
              <div className="dropdown-menu">
                <a id="dashboard" href="#dashboard" className="dropdown-item" onClick={this.setTab}>dashboard</a>
                <a id="transactions" href="#transactions" className="dropdown-item" onClick={this.setTab}>transactions</a>
                <a id="buy" href="#buy" className="dropdown-item" onClick={this.setTab}>buy</a>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-dark" onClick={this.signOut}>sign out</button>
          </div>
        </nav>
        <div className="container my-4 text-center"> {currentTab} </div>
      </div>
    );
  }
}

export default PortfolioPage