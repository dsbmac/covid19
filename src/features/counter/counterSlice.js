/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import summaryJson from "../../data/summary.json"
import spainJson from "../../data/spain-confirmed-history.json"
const baseApiUrl = "https://api.covid19api.com"
export const slice = createSlice({
  name: "counter",
  initialState: {
    dayOne: {},
    summary: summaryJson,
    value: 0,
    isFetching: false,
    fetchedData: spainJson,
    confirmed: {},
    recovered: {},
    deaths: {},
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setCountryStatus: (state, action) => {
      const { country, status, data } = action.payload
      // const newState = { ...state };
      const { dayOne } = state
      if (!(country in dayOne)) {
        dayOne[country] = {}
      }
      dayOne[country] = { ...dayOne[country], [status]: [...data] }
      state.fetchedData = [...data]
    },
  },
})

export const {
  increment,
  decrement,
  incrementByAmount,
  setCountryStatus,
} = slice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

export const fetchCountryStatus = (country, status) => (dispatch) => {
  const subpath = `/dayone/country/${country}/status/${status}`
  const fullpath = baseApiUrl + subpath

  axios.get(fullpath).then(({ data }) => {
    dispatch(setCountryStatus({ country, status, data }))
  })
}

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value
export const selectDayOne = (state) => state.counter.dayOne
export const selectIsFetching = (state) => state.counter.isFetching
export const selectfetchedData = (state) => state.counter.fetchedData

export default slice.reducer
