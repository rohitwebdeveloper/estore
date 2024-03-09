import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './Store/store'
import {Provider} from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
<Provider store={store} > 
  <BrowserRouter>
    <GoogleOAuthProvider clientId='849842872886-srpeoautdfu2ht62cd66qm85bn9h8ms3.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
