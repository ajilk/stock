import React, { Component } from 'react'
import firebase from 'firebase/app'
import Result from '../../components/Result.component'
import StockModel from '../../models/Stock.model'
import TransactionModel from '../../models/Transaction.model'
import key from '../../alphaVantageConfig'

export default class BuyTab extends Component {
  state = {
    stockName: '',
    quantity: '',
    searchResults: []
  }

  onStockNameChange = async (e) => {
    this.setState({ stockName: e.target.value })
    const { stockName } = this.state
    const API_URL = `https://www.alphavantage.co/query?function=`
    await fetch(API_URL + 'SYMBOL_SEARCH&keywords=' + stockName + '&apikey=' + key)
      .then(result => result.json())
      .then(
        result => this.setState({ searchResults: result['bestMatches'] }),
        error => console.log(error)
      )
  }

  onQuantityChange = (e) => this.setState({ quantity: e.target.value })

  inputNotValid = () => {
    // TODO: Validate stockName & quanity more rigorously
    if (!this.state.quantity || !this.state.stockName) return true
    return false
  }

  onBuy = () => {
    if (this.inputNotValid()) return
    const { stockName, quantity } = this.state
    const sharePrice = 10.3
    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid
    const transaction = new TransactionModel(uid, stockName, quantity, -1 * sharePrice)
    const stock = new StockModel(stockName, quantity)
    const userReference = db.collection("users").doc(uid)

    // Update balance
    userReference.get().then((userSnapshot) => {
      const priorBalance = userSnapshot.get('balance')
      userReference.set({ 'balance': parseInt(priorBalance) + parseInt(transaction.amount) })
    })

    // Record transaction
    db.collection("transactions").add(Object.assign({}, transaction)).then((transactionReference) => {
      // Update owned stocks (setting stock details by id)
      // WRONG: ownedStocks should be by their ticker name (it's a set) will solve duplication
      userReference.collection('ownedStocks').doc(transactionReference.id).set(Object.assign({}, stock)).then(() => {
        this.setState({ stockName: '', quantity: '' })
      })
    })
  }

  onResultClick = symbol => this.setState({ stockName: symbol, searchResults: [] })

  render() {
    const BuyForm = (
      <div>
        <h2>buy stocks</h2>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-12">
            <div className="form-group">
              <input value={this.state.stockName} type="text" className="form-control" id="tickerInput" aria-describedby="tickerHelp" placeholder="e.g. AAPL, GOOGL" onChange={this.onStockNameChange} />
            </div>
            <div className="form-group">
              <input value={this.state.quantity} type="number" className="form-control" id="quantityInput" placeholder="e.g. 10" onChange={this.onQuantityChange} />
            </div>
            <button type="submit" className="btn btn-block btn-outline-secondary" onClick={this.onBuy}>buy</button>
          </div>
        </div>
      </div>
    )
    return (
      <>
        {BuyForm}
        <div className="container w-50 p-5">
          <h5>results</h5>
          <hr />
          {
            this.state.searchResults && this.state.searchResults.length > 0 ?
              this.state.searchResults.slice(0, 5)
                .map(result => { return <Result onClick={this.onResultClick} result={result} key={result['1. symbol']} /> })
              : null
          }
        </div>
      </>
    )
  }
}
