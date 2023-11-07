import 'tailwindcss/tailwind.css'
import { AuthProvide } from '../contexts/AuthContexts'

function MyApp({ Component, pageProps }) {
  return (
  <AuthProvide >
    <Component {...pageProps} />
  </AuthProvide>
  )
}

export default MyApp
