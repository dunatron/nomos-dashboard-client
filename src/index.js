import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { ApolloProvider } from "react-apollo"
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { BrowserRouter } from "react-router-dom"
import { AUTH_TOKEN } from "./constants"
import { setContext } from "apollo-link-context"
import { split } from "apollo-link"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"

// Redux
import { saveState } from "./state/localStorage"
import throttle from "lodash/throttle"
import { PERSISTENT_STORE_KEYS_ARR } from "./constants"
import store from "./state/store"
import { Provider as Redux } from "react-redux"

// Material Design
import { MuiThemeProvider } from "@material-ui/core/styles"
/* eslint-disable */
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider"
// pick utils
import MomentUtils from "material-ui-pickers/utils/moment-utils"

// Redux function which will help us subscribe our store state, using our saveState function
store.subscribe(
  throttle(() => {
    const storeState = store.getState()
    const persistentState = Object.keys(storeState)
      .filter(key => PERSISTENT_STORE_KEYS_ARR.includes(key))
      .reduce((obj, key) => {
        obj[key] = storeState[key]
        return obj
      }, {})
    saveState({
      // user: store.getState().user,
      ...persistentState,
    })
  }, 1500)
)

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <Redux store={store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </ApolloProvider>
    </BrowserRouter>
  </Redux>,
  document.getElementById("root")
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
