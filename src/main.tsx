import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import './styles/globals.css'
import reportWebVitals from './reportWebVitals.ts'

import App from './App.tsx'

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
