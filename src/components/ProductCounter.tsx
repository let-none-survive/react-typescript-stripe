import * as React from 'react'

interface IProps {
  amount: number
  incrementHandler: () => void
  decrementHandler: () => void
}

const ProductCounter: React.FC<IProps> = ({
  amount,
  decrementHandler,
  incrementHandler,
}) => {
  return (
    <div className="columns">
      <div className="column has-text-centered">
        <button onClick={decrementHandler} className="button is-danger">
          <span className="icon">
            <i className="fas fa-minus" />
          </span>
        </button>
      </div>
      <div className="column has-text-centered">
        <div className="title">{amount}</div>
      </div>
      <div className="column has-text-centered">
        <button onClick={incrementHandler} className="button is-success">
          <span className="icon">
            <i className="fas fa-plus" />
          </span>
        </button>
      </div>
    </div>
  )
}

export default ProductCounter
