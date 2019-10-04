import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

class DashboardTab extends Component {
  state = {
    ownedStocks: []
  }

  componentDidMount() {
    this.getOwnedStocks().then(ownedStocks =>
      this.setState({ ownedStocks: ownedStocks })
    )
  }

  async getOwnedStocks() {
    let db = firebase.firestore()
    const stocksCollectionSnapshot = await db.collection("users").doc(firebase.auth().currentUser.uid).collection("ownedStocks").get()
    var ownedStocks = []
    stocksCollectionSnapshot.forEach(doc => ownedStocks.push(doc.data()))
    return ownedStocks;
  }

  render() {
    return (
      <>
        <h2>dashboard</h2>
        {this.state.ownedStocks.map(stock => <h5>{stock.name} - {stock.quantity}</h5>)}
      </>
    );
  }
}

export default DashboardTab