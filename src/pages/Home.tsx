import * as React from 'react'
import { useQuery } from 'react-query'
import { getProducts } from '../api'
import Card from '../components/Card'
import Layout from '../components/Layout'
import { CartContext } from '../context/CartContext'
import { Product } from '../interfaces'
import { chunk } from 'lodash'

const Home: React.FC = () => {
  const { addToCart } = React.useContext(CartContext)
  const { data, error, isLoading } = useQuery<Product[]>(
    'products',
    getProducts,
  )

  const productsChunk: Product[][] = React.useMemo(() => {
    if (isLoading || error) return []
    return chunk(data, 4)
  }, [data, isLoading, error])

  return (
    <Layout>
      <div className="section">
        <div className="title">Products</div>
        <div className="subtitle mb-6">List of products</div>
        {productsChunk.map((productArr, i) => (
          <div className="columns" key={i}>
            {productArr.map((product) => {
              return (
                <Card
                  key={product.id}
                  product={product}
                  addToCartHandler={addToCart}
                />
              )
            })}
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Home
