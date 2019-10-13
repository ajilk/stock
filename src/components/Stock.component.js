import React, { Component } from 'react'
import { API_KEY, API_URL } from '../../src/config/alphaVantageConfig'

class Stock extends Component {
  state = {
    hovered: false,
    openPrice: '',
    currPrice: '',
  }

  toggleHover = () => this.setState({ hovered: !this.state.hovered })

  render() {
    const { stock } = this.props
    // Get price (curr, open)
    fetch(API_URL + 'GLOBAL_QUOTE&symbol=' + stock.name + '&apikey=' + API_KEY)
      .then(result => result.json())
      .then(
        result => {
          if (result['Global Quote'] === undefined) return
          this.setState({
            openPrice: parseFloat(result['Global Quote']['02. open']),
            currPrice: parseFloat(result['Global Quote']['05. price'])
          })
        },
        error => console.log(error)
      )
    const status = this.state.openPrice > this.state.currPrice ? 'm-0 text-danger' : 'm-0 text-success'
    return (
      <div className={`row py-2 border ${this.state.hovered ? "border-dark" : ""}`}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <div className="col-4 text-left my-auto">
          <h6 className="m-0"><b>symbol: </b> {stock.name}</h6>
        </div>
        <div className="col-4 text-left my-auto">
          <h6 className="m-0"><b>quanity: </b>{stock.quantity}</h6>
        </div>
        <div className="col-4 text-left my-auto">
          <h6 className={status}>${this.state.currPrice}</h6>
        </div>
      </div>
    );
  }
}
export default Stock