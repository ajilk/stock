import React, { Component } from 'react'
import firebase from 'firebase/app'
import Result from '../../components/Result.component'
import StockModel from '../../models/Stock.model'
import TransactionModel from '../../models/Transaction.model'
import key from '../../config/alphaVantageConfig'

const API_URL = 'https://www.alphavantage.co/query?function='
const API_KEY = '&apikey=' + key

export default class BuyTab extends Component {
  state = {
    stockName: '',
    quantity: '',
    searchResults: []
  }

  onStockNameChange = e => this.setState({ stockName: e.target.value }, this.fetchResults)

  fetchResults = () => {
    fetch(API_URL + 'SYMBOL_SEARCH&keywords=' + this.state.stockName + API_KEY)
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
    fetch(API_URL + 'GLOBAL_QUOTE&symbol=' + stockName + API_KEY)
      .then(result => result.json())
      .then(
        result => {
          const price = result['Global Quote']['05. price']
          const db = firebase.firestore();
          const uid = firebase.auth().currentUser.uid
          const transaction = new TransactionModel(uid, stockName, quantity, -1 * price)
          const stock = new StockModel(stockName, quantity)
          const userReference = db.collection("users").doc(uid)

          // Update balance
          userReference.get().then((userSnapshot) => {
            const priorBalance = userSnapshot.get('balance')
            userReference.update({ 'balance': parseFloat(priorBalance) + parseFloat(transaction.amount) })
          })

          // Record transaction
          db.collection("transactions").add(Object.assign({}, transaction)).then((transactionReference) => {
            // Update owned stocks (setting stock details by id)
            // WRONG: ownedStocks should be by their ticker name (it's a set) will solve duplication
            userReference.collection('ownedStocks').doc(transactionReference.id).set(Object.assign({}, stock)).then(() => {
              this.setState({ stockName: '', quantity: '' })
            })
          })
        },
        error => console.log(error)
      )
      .catch(error => console.log(error))
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
        <div className="col-10 col-lg-5 mx-auto">
          <h5 className="pt-5">results</h5>
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
