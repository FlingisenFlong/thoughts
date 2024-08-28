import { Route, Routes } from "react-router-dom"
import "./App.css"
import New from "./pages/New"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
