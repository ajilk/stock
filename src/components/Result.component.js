import React, { useState } from 'react'

function ResultComponent(props) {
  const [hovered, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hovered)
  const { '1. symbol': symbol, '2. name': name } = props.result
  return (
    <div className={`row m-2 py-2 border ${hovered ? "border-dark" : ""}`}
      onClick={() => props.onClick(symbol)}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}>
      <div className="col-1 text-left">{symbol}</div>
      <div className="col text-right">{name}</div>
    </div>
  );
}
export default ResultComponent