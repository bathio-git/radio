import '@/styles/globals.css'
import Context from '../Context/Context.js'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Context>
          <Component {...pageProps} />
      </Context>
    </>
  )
}