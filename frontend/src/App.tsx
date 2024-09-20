import { Route, Routes } from "react-router-dom"
import "./App.css"
import New from "./pages/New"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
