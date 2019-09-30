import React, { Component } from 'react'

class Buy extends Component {
  state = {
    stock: '',
    quantity: ''
  }

  onTickerChange = (e) => this.setState({ stock: e.target.value })
  onQuantityChange = (e) => this.setState({ quantity: e.target.value })

  onBuy = () => {
    console.log(`bought ${this.state.quantity} shares of ${this.state.stock}`)
  }

  render() {
    return (
      <>
        <h2>buy stocks</h2>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-12">
            <div className="form-group">
              <input value={this.state.stock} type="text" className="form-control" id="tickerInput" aria-describedby="tickerHelp" placeholder="e.g. AAPL, GOOGL" onChange={this.onTickerChange} />
            </div>
            <div className="form-group">
              <input value={this.state.quantity} type="number" className="form-control" id="quantityInput" placeholder="e.g. 10" onChange={this.onQuantityChange} />
            </div>
            <button type="submit" className="btn btn-block btn-outline-secondary" onClick={this.onBuy}>buy</button>
          </div>
        </div>
      </>
    )
  }
}

export default Buy