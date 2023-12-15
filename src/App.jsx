
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './component/Home'

import CountryInfo from './component/countryInfo'
import Logo from './component/Logo'


function App() {
  

  return (
    <BrowserRouter>
      <div className="App">
        <Logo />
        <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/country/:cca3" element={<CountryInfo/>} ></Route>
        
        </Routes>
      </div>
      </BrowserRouter>
  )
}

export default App
