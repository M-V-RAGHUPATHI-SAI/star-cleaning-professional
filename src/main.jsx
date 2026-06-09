import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { businessConfig } from './businessConfig'

// Inject color CSS variables from businessConfig so swapping palettes
// only requires changing businessConfig.colors — no JSX edits needed.
const { colors, fonts } = businessConfig
Object.entries(colors).forEach(([key, value]) => {
  document.documentElement.style.setProperty(`--color-${key}`, value)
})

// Inject font CSS variables
document.documentElement.style.setProperty('--font-primary', fonts.primary)
document.documentElement.style.setProperty('--font-display', fonts.display)

// Load Google Fonts dynamically from businessConfig
const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href = fonts.googleFontsUrl
document.head.appendChild(fontLink)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
