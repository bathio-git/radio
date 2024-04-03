import '@/styles/globals.css'
import Context from '../Context/Context.js'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Context>
          <Component {...pageProps} />
      </Context>
    </>
  )
}