import React, { Component } from 'react'
import firebase from 'firebase/app'
import Stock from '../../components/Stock.component'
import 'firebase/firestore'

class DashboardTab extends Component {
  state = {
    userBalance: 0.0,
    ownedStocks: []
  }

  componentDidMount() {
    this.getOwnedStocks().then(ownedStocks =>
      this.setState({ ownedStocks: ownedStocks })
    )
    const uid = firebase.auth().currentUser.uid
    const userReference = firebase.firestore().collection("users").doc(uid)
    userReference.get().then(userSnapshot => {
      this.setState({
        balance: userSnapshot.get('balance'),
        firstName: userSnapshot.get('firstName'),
        lastName: userSnapshot.get('lastName')
      })
    })
  }

  getOwnedStocks = async () => {
    let db = firebase.firestore()
    const stocksCollectionSnapshot = await db.collection("users").doc(firebase.auth().currentUser.uid).collection("ownedStocks").get()
    var ownedStocks = []
    stocksCollectionSnapshot.forEach(doc => ownedStocks.push(doc.data()))
    return ownedStocks;
  }

  render() {
    const { firstName, lastName, balance } = this.state
    return (
      <>
        <div className="row ">
          <div className="col-4 text-left">
            <h2>Hello {firstName} {lastName} </h2>
          </div>
          <div className="col text-right">
            <h4><b>balance:</b> ${parseFloat(balance).toFixed(3)}</h4>
          </div>
        </div>
        <hr />
        <h4><b>owned stocks</b></h4>
        {this.state.ownedStocks.length > 0 ? this.state.ownedStocks.map(stock => <Stock stock={stock} />) : <h5>come back here after investing</h5>
        }
      </>
    );
  }
}

export default DashboardTab