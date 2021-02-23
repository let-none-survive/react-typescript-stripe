import * as React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useMutation } from 'react-query'
import { fetchClientSecret, updatePaymentIntent } from '../api'
import { CartContext } from '../context/CartContext'
import { Redirect } from 'react-router-dom'

const CheckoutForm: React.FC = () => {
  const { cart, clearCard } = React.useContext(CartContext)
  const [succeeded, setSucceeded] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [email, setEmail] = React.useState('')
  const [processing, setProcessing] = React.useState<string | boolean>('')
  const [disabled, setDisabled] = React.useState(true)
  const [clientSecret, setClientSecret] = React.useState('')
  const [redirect, setRedirect] = React.useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const createPaymentIntentMutation = useMutation(fetchClientSecret, {
    onSuccess: (data) => {
      setClientSecret(data.clientSecret)
    },
  })

  const updatePaymentIntentMutation = useMutation(updatePaymentIntent, {
    onSuccess: () => {
      clearCard()
      setRedirect(true)
    },
  })

  React.useEffect(() => {
    createPaymentIntentMutation.mutate(cart)
  }, [cart])

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setProcessing(true)
    stripe
      .confirmCardPayment(clientSecret, {
        receipt_email: email,
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((payload) => {
        if (payload.error) {
          setError(`Payment failed ${payload.error.message}`)
          setProcessing(false)
        } else {
          updatePaymentIntentMutation.mutate(payload.paymentIntent)
          setError(null)
          setProcessing(false)
          setSucceeded(true)
        }
      })
  }

  if (redirect) {
    return <Redirect to="/?payment=success" />
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button
        disabled={Boolean(processing) || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner" /> : 'Pay now'}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {' '}
          Stripe dashboard.
        </a>{' '}
        Refresh the page to pay again.
      </p>
    </form>
  )
}

export default CheckoutForm
