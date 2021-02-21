import * as React from 'react'
import CheckoutForm from '../components/CheckoutForm'
import Layout from '../components/Layout'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import '../assets/scss/Checkout.scss'

const promise = loadStripe(process.env.STRIPE_API_KEY)

const Checkout: React.FC = () => {
  return (
    <Layout>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Layout>
  )
}

export default Checkout
