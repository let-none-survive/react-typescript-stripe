import * as React from 'react'
import { moneyFormatter } from '../helpers'
import { Product } from '../interfaces'

interface IProps {
  product: Product
  addToCartHandler: (product: Product) => any
}

const Card: React.FC<IProps> = ({ product, addToCartHandler }) => {
  return (
    <div className="card equal-height column mr-3 mb-3">
      <div>
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={product.image} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="title is-5">{product.title}</div>
          <div className="subtitle is-7">{product.category}</div>
          <div className="content">{product.description}</div>
        </div>
      </div>
      <div className="card-footer is-fixed-bottom">
        <button
          onClick={() => addToCartHandler(product)}
          className="card-footer-item button is-success"
        >
          Add to Cart - {moneyFormatter(product.price)}
        </button>
      </div>
    </div>
  )
}

export default Card
