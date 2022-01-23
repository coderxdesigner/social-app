import React, { useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"

//my components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"
import ExampleContext from "./ExampleContext"

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))
  const [flashMessages, setFlashMessages] = useState([])

  function addFlashMessage(msg) {
    setFlashMessages(prev => prev.concat(msg))
  }
  return (
    <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" exact element={loggedIn ? <Home /> : <HomeGuest />} />
          <Route path="/post/:id" element={<ViewSinglePost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ExampleContext.Provider>
  )
}
ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
