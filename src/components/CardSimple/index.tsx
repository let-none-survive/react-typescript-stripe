import * as React from 'react'
import { CartContext } from '../../context/CartContext'
import { Product } from '../../interfaces'
import './card-simple.scss'
import ProductCounter from '../ProductCounter'

interface IProps {
  product: Product
  amount: number
}

const CardSimple: React.FC<IProps> = ({ product, amount }) => {
  const { addToCart, removeFromCart } = React.useContext(CartContext)
  return (
    <div className="box mb-3">
      <div className="columns">
        <div className="column is-2">
          <figure className="image is-128x128">
            <img src={product.image} alt="Placeholder image" />
          </figure>
        </div>
        <div className="column">
          <div className="title">{product.title}</div>
          <div className="subtitle mb-3">{product.category}</div>
          <div className="columns">
            <div className="column">
              <div className="description">{product.description}</div>
            </div>
            <div className="column is-2">
              <ProductCounter
                amount={amount}
                incrementHandler={() => addToCart(product)}
                decrementHandler={() => removeFromCart(product.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSimple
