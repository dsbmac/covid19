import React, { useEffect, useState } from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import CasesCard from "../features/dashboard/CasesBrief"
import HistoryChart from "./HistoryChart"
import { capitalizeFirst, formatDate } from "../utils"

export const History = ({ fetchedData, isFetching, fixedHeightPaper }) => {
  const [chartData, setChartData] = useState(null)
  const [chartTitle, setChartTitle] = useState(null)

  useEffect(() => {
    if (!isFetching && fetchedData) {
      const newChartData = fetchedData.map((el) => {
        const { Date } = el
        if (!Date) return
        const newDate = formatDate(Date)
        return { ...el, Date: newDate }
      })
      const country = newChartData[0].Country
      const status = capitalizeFirst(newChartData[0].Status)
      const title = `${country} ${status} Cases`
      setChartData(newChartData)
      setChartTitle(title)
    }
  }, [isFetching, fetchedData])

  //   useEffect(() => {
  //     if (data && hasInitialized) {
  //       const sortFn = (a, b) => a.Date > b.Date

  //       const truncateData = (cases) => {
  //         let truncatedData = [...cases]
  //         truncatedData.sort(sortFn).reverse()
  //         truncatedData = truncatedData.slice(0, 5)

  //         return truncatedData
  //       }

  //       const { cases } = dayOne["united-kingdom"].status.confirmed
  //       const newTrunc = truncateData(cases)
  //       setAboveFoldData(newTrunc)
  //     }
  //   }, [dayOne, data, hasInitialized])

  return (
    <>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            {fetchedData ? (
              <HistoryChart
                data={chartData}
                isFetching={isFetching}
                title={chartTitle}
              />
            ) : (
              "Loading"
            )}
          </Paper>
        </Grid>
        {/* Recent CasesCard */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <CasesCard />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          {/* <Paper className={classes.paper}>
            <Orders data={aboveFoldData} />
          </Paper> */}
        </Grid>
      </Grid>
    </>
  )
}
