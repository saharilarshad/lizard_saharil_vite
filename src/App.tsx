import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import DetailPage from "./detail"




function App() {

  return (
    <>
      
      <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
