import React from "react"
import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import DashBoardContainer from "./features/dashboard/DashBoardContainer"
import "./App.css"
import { useSelector } from "react-redux"
import { fetchCountryStatus, selectDayOne } from "./features/counter/counterSlice"

function App() {
  const data = useSelector(selectDayOne)
  return (
    <div className="App">
      <DashBoardContainer />
    </div>
  )
}

export default App
