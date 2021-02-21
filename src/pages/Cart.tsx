import * as React from 'react'
import { Link } from 'react-router-dom'
import CardSimple from '../components/CardSimple'
import Layout from '../components/Layout'
import { CartContext } from '../context/CartContext'
import { groupBy } from 'lodash'
import { Product } from '../interfaces'

interface GroupedProducts {
  [key: number]: Product[]
}

const Cart: React.FC = () => {
  const { cart } = React.useContext(CartContext)
  const groupedProducts: GroupedProducts = React.useMemo<GroupedProducts>(() => {
    return groupBy(cart, 'id')
  }, [cart])

  return (
    <Layout>
      <div className="section">
        <div className="title">Cart</div>
        <div className="subtitle">Cart items</div>
        {Object.keys(groupedProducts).map((key) => {
          const productGroup = groupedProducts[key]

          return (
            <CardSimple
              key={key}
              amount={productGroup.length}
              product={productGroup[0]}
            />
          )
        })}
        <Link to="/checkout">
          <button className="button is-primary">Checkout</button>
        </Link>
      </div>
    </Layout>
  )
}

export default Cart
