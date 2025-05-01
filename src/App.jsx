import { Toaster } from 'react-hot-toast'
import './App.css'
import { Footer } from './Components/Footer'
import { Navbar } from './Components/Navbar'
import {AllRoutes} from "./Routes/AllRoutes"

function App() {

  return (
    <>
    <Navbar />
    <div className="w-full h-16"></div>
    <AllRoutes />
    <Footer />
    <Toaster position='top-center' duration={3000} />
    </>
  )
}

export default App
