
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './auth/Register';
import Login from './auth/Login';
import Account from "./auth/Account";
import Home from "./components/Home";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import Gallery from "./components/Gallery";
import HandleImage from "./components/HandleImage";
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/handle" element={<HandleImage />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
