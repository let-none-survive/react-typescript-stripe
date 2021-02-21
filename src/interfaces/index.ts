export interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

export interface ICartContext {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (product_id: number) => void
  clearCard: () => void
}
