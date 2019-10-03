import React, { Component } from 'react'
import Transaction from '../components/Transaction'
import firebase from 'firebase/app'
import 'firebase/firestore'

class Transactions extends Component {
  state = {
    transactions: []
  }

  componentDidMount() {
    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid
    db.collection("transactions").where("uid", "==", uid).get()
      .then((query) => {
        query.forEach((doc) => {
          this.setState(prevState => (
            { transactions: [doc.data(), ...prevState.transactions] }
          ))
        })
      })
  }

  render() {
    return (
      <div>
        <h2>transactions</h2>
        <div className="container w-75"> {this.state.transactions.sort((a, b) => (a.time < b.time) ? 1 : -1).map(t => {
          return <Transaction time={t.time} name={t.name} quantity={t.quantity} amount={t.amount} />
        })}
        </div>
      </div>
    );
  }
}

export default Transactions