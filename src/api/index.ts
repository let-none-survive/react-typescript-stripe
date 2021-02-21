import { Product } from '../interfaces'
import { PaymentIntent } from '@stripe/stripe-js'

export const getProducts = (): Promise<Product[]> => {
  return fetch(`${process.env.BASE_URL}/products`).then((res) => res.json())
}

export const fetchProducts = (): Promise<boolean> => {
  return fetch(`${process.env.BASE_URL}/products/fetch`, {
    method: 'POST',
  }).then((res) => res.json())
}

export const fetchClientSecret = (products: Product[]): Promise<any> => {
  return fetch(`${process.env.BASE_URL}/stripe/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ products }),
  }).then((res) => res.json())
}

export const updatePaymentIntent = (
  payload: PaymentIntent,
): Promise<boolean> => {
  console.log({ payload })
  return fetch(
    `${process.env.BASE_URL}/stripe/update-payment-intent/${payload.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    },
  ).then((res) => res.json())
}
