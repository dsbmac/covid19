import React, { useEffect, useState } from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Country from "../../components/Country"
import CasesBrief from "./CasesBrief"
import SummaryTable from "./SummaryTable"
import WorldSummaryTable from "./WorldSummaryTable"

export const Summary = ({
  fetchedData,
  isFetching,
  fixedHeightPaper,
  paperStyle,
  location,
}) => {
  const [chartData, setChartData] = useState(null)
  const [worldData, setWorldData] = useState(null)

  function createWorldSummary(dataToProcess) {
    const reducer = (accumulator, country) => {
      const keys = Object.keys(country)
      keys.forEach((key) => {
        if (key === "Country" || key === "CountrySlug") {
          key in accumulator
            ? accumulator[key].push(country[key])
            : (accumulator[key] = [country[key]])
        } else {
          try {
            accumulator[key] =
              key in accumulator ? country[key] + accumulator[key] : country[key]
          } catch (error) {}
        }
      })
      return accumulator
    }

    const summary = dataToProcess.Countries.reduce(reducer, {})
    summary.Date = dataToProcess.Date
    return summary
  }

  useEffect(() => {
    if (!isFetching && fetchedData) {
      const newChartData = fetchedData
      setChartData(newChartData)
      const worldSummary = createWorldSummary(fetchedData)
      setWorldData(worldSummary)
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
      <div>{JSON.stringify(location)}</div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper>
            {worldData ? (
              <CasesBrief
                totalDeaths={worldData.TotalDeaths}
                date={worldData.Date}
                totalRecovered={worldData.TotalRecovered}
                totalConfirmed={worldData.TotalConfirmed}
              />
            ) : null}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={paperStyle}>
            {worldData ? (
              <WorldSummaryTable data={worldData}></WorldSummaryTable>
            ) : null}
            {/* <SummaryTable data={fetchedData} /> */}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
