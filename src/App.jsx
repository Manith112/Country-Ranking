
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './component/Home.jsx'

import CountryInfo from './component/CountryInfo.jsx'
import Logo from './component/Logo.jsx'


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

export default App;
