import React from "react"
import ReactDOM from "react-dom"

//my components
import Header from "./components/Header"
function ExampleComponent() {
  return (
    <>
      <Header />
      <div className="container py-md-5">
        <div className="row align-items-center">
          <div className="col-lg-7 py-3 py-md-5">
            <h1 className="display-3">Remember Writing?</h1>
            <p className="lead text-muted">Are you sick of short tweets and impersonal &ldquo;shared&rdquo; posts that are reminiscent of the late 90&rsquo;s email forwards? We believe getting back to actually writing is the key to enjoying the internet again.</p>
          </div>
          <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
            <form>
              <div className="form-group">
                <label for="username-register" className="text-muted mb-1">
                  <small>Username</small>
                </label>
                <input id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autocomplete="off" />
              </div>
              <div className="form-group">
                <label for="email-register" className="text-muted mb-1">
                  <small>Email</small>
                </label>
                <input id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autocomplete="off" />
              </div>
              <div className="form-group">
                <label for="password-register" className="text-muted mb-1">
                  <small>Password</small>
                </label>
                <input id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
              </div>
              <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
                Sign up for ComplexApp
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="border-top text-center small text-muted py-3">
        <p>
          <a href="/" className="mx-1">
            Home
          </a>{" "}
          |{" "}
          <a className="mx-1" href="/about-us">
            About Us
          </a>{" "}
          |{" "}
          <a className="mx-1" href="/terms">
            Terms
          </a>
        </p>
        <p className="m-0">
          Copyright &copy; 2020{" "}
          <a href="/" className="text-muted">
            ComplexApp
          </a>
          . All rights reserved.
        </p>
      </footer>
    </>
  )
}
ReactDOM.render(<ExampleComponent />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
