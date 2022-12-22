import '@master/css'
import '@master/keyframes.css';
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }) {
  return <>
    <Toaster />
    <Component {...pageProps} />
  </>
}

export default MyApp
