import * as React from 'react'
import { CartContext } from '../context/CartContext'
import { Product } from '../interfaces'

const CartContextWrapper: React.FC<React.ReactNode> = ({ children }) => {
  const [cart, setCart] = React.useState<Product[]>([])

  const addToCart = React.useCallback(
    (product: Product) => {
      setCart([...cart, product])
    },
    [cart],
  )

  const removeFromCart = React.useCallback(
    (product_id: number) => {
      const productToRemoveIndex = cart.findIndex(
        (product) => product.id === product_id,
      )
      const newCart = [...cart]
      newCart.splice(productToRemoveIndex, 1)
      setCart(newCart)
    },
    [cart],
  )

  const clearCard = React.useCallback(() => {
    setCart([])
  }, [])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCard }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextWrapper
