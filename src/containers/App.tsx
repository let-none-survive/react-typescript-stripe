import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { hot } from 'react-hot-loader'

import '../assets/scss/App.scss'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'

import Home from '../pages/Home'
import CartContextWrapper from '../components/CartContextWrapper'
import ReactQueryContextWrapper from '../components/ReactQueryContextWrapper'

const App: React.FC = () => {
  return (
    <ReactQueryContextWrapper>
      <CartContextWrapper>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/checkout" exact>
              <Checkout />
            </Route>
          </Switch>
        </Router>
      </CartContextWrapper>
    </ReactQueryContextWrapper>
  )
}

declare let module: Record<string, unknown>

export default hot(module)(App)
