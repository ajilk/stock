import React from 'react'

export default function Signin() {
  return (
    <div className="container p-5 text-center">
      <h2>welcome back</h2>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-12">
          <form>
            <div className="form-group">
              <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="email" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="passwordInput" placeholder="password" />
            </div>
            <button type="submit" className="btn btn-block btn-outline-secondary">sign in</button>
          </form>
        </div>
      </div>
    </div>
  )
}