import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Sample from "../src/components/Sample"


function App() {

  return (
    <>
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sample />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
