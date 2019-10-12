import React, { useState } from 'react'

function Transaction(props) {
  const [hovered, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hovered)
  const { name, quantity, amount } = props
  const time = new Date(props.time).toLocaleString()

  return (
    <div className={`row py-2 border ${hovered ? "border-dark" : ""}`}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className="col-4 text-left my-auto">
        <h6 className="m-0">{time}</h6>
      </div>
      <div className="col-2 text-left my-auto ">
        <h5 className="m-0">{name}</h5>
      </div>
      <div className="col-2 text-left my-auto ">
        <p className="m-0">{amount < 0 ? "BOUGHT" : "SOLD"}</p>
      </div>
      <div className="col text-right">
        <p className="my-auto"> {quantity} {amount > 1 ? 'shares' : 'share'} @ {amount < 0 ? -1 * amount : amount}</p>
      </div>
    </ div>
  )
}

export default Transaction