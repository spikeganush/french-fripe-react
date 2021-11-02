import React from 'react'
import ReactDOM from 'react-dom'

// import { Provider } from 'react-redux'
// import { applyMiddleware, createStore } from 'redux'
import App from './App'
// import thunk from 'redux-thunk'
// import rootReducer from './reducers'
// import { getUsers } from './actions/users.actions'

// dev tools
// import { composeWithDevTools } from 'redux-devtools-extension'

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// )

ReactDOM.render(
  // <Provider store={store}>
  <App />,
  // </Provider>
  document.getElementById('root')
)
