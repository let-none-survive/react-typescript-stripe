import { createContext, Context } from 'react'
import { ICartContext, Product } from '../interfaces'

export const CartContext: Context<ICartContext> = createContext({
  cart: [],
  addToCart: (product: Product) => {},
  removeFromCart: (product_id: number) => {},
  clearCard: () => {},
})
