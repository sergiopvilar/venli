import React from "react";
import Example from "./components/Example"
import Auth from './components/auth/Auth'
import Dashboard from "./components/dashboard/Dashboard";
import Store from './ObjectStore'

function App() {
  const authenticated = Store.getValue("authenticated")

  return (
    <>
      {authenticated && <Dashboard />}
      {!authenticated && <Auth />}
    </>
  )
}

export default App;
