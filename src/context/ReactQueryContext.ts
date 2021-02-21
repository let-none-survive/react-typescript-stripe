import { createContext, Context } from 'react'

export const ReactQueryContext: Context<any> = createContext({
  client: {},
})
