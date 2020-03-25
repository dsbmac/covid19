import React, { useEffect, useState } from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Country from "../../components/Country"
import Deposits from "./CasesBrief"

const Deaths = (fetchedData, isFetching, fixedHeightPaper) => {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    if (!isFetching && fetchedData) {
      const newChartData = [...fetchedData.status.confirmed.totals]
      setChartData(newChartData)
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
      <div>{JSON.stringify(fetchedData)}</div>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            {fetchedData ? (
              <Country data={fetchedData[0]} isFetching={isFetching} title="UK" />
            ) : (
              "Loading"
            )}
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
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

export { Deaths }
