import React, { Component } from 'react'
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
        <table className="container">
          <tr>
            <th>time</th>
            <th>ticker name</th>
            <th>quantity</th>
            <th>amount</th>
          </tr>
          {this.state.transactions.map(transaction => {
            return (
              <tr>
                <td>{transaction.time}</td>
                <td>{transaction.name}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.amount}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default Transactions