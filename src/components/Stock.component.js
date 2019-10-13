import React, { useState } from 'react'
import { API_KEY, API_URL } from '../../src/config/alphaVantageConfig'

function Stock(props) {
  const [hovered, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hovered)
  const { stock } = props
  var openPrice, currPrice;
  // Get price (curr, open)
  fetch(API_URL + 'GLOBAL_QUOTE&symbol=' + stock.name + '&apikey=' + API_KEY)
    .then(result => result.json())
    .then(
      result => {
        if(result['Global Quote'] === undefined) return 
        openPrice = parseInt(result['Global Quote']['02. open'])
        currPrice = parseInt(result['Global Quote']['05. price'])
      },
      error => console.log(error)
    )

  const status = currPrice < openPrice ? "m-0 text-danger" : "m-0 text-success"

  return (
    <div className={`row py-2 border ${hovered ? "border-dark" : ""}`}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className="col-4 text-left my-auto">
        <h6 className="m-0"><b>symbol: </b> {stock.name}</h6>
      </div>
      <div className="col-4 text-left my-auto">
        <h6 className="m-0"><b>quanity: </b>{stock.quantity}</h6>
      </div>
      <div className="col-4 text-left my-auto">
        <h6 className={status}>${currPrice}</h6>
      </div>
    </div>
  );
}
export default Stock