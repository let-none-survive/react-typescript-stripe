import * as React from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api'
import { CartContext } from '../context/CartContext'
import { ReactQueryContext } from '../context/ReactQueryContext'
import { moneyFormatter } from '../helpers'
import * as classNames from 'classnames'

const NavBar: React.FC = () => {
  const { client } = React.useContext(ReactQueryContext)
  const { cart } = React.useContext(CartContext)
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchMutation = useMutation(fetchProducts, {
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
    },
    onSuccess: () => {
      setIsLoading(false)
      return client.invalidateQueries('products')
    },
  })

  const totalPrice = React.useMemo(() => {
    return cart.reduce((acc, val) => {
      return acc + val.price
    }, 0)
  }, [cart])

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Products
          </Link>
          <button
            className={classNames(
              'button is-success navbar-item mt-2 is-rounded is-outlined',
              {
                'is-loading': isLoading,
              },
            )}
            onClick={() => fetchMutation.mutate()}
          >
            Fetch products
          </button>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="field is-grouped">
            <p className="control">
              <Link to="cart" className="button is-primary">
                <span className="icon">
                  <i className="fas fa-shopping-cart" />
                </span>
                <span>
                  {cart.length} - items in cart for {moneyFormatter(totalPrice)}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
