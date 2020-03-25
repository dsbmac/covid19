import React, { useEffect, useState } from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { MediaGallery } from "./MediaGallery/MediaGallery"
import { capitalizeFirst, formatDate } from "../utils"

export const Visuals = ({ fetchedData, isFetching, fixedHeightPaper }) => {
  const [chartData, setChartData] = useState(null)
  const [chartTitle, setChartTitle] = useState(null)

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
  const styles = {
    grid: {
      padding: "40px",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    },
  }

  return (
    <Paper>
      <Grid container spacing={3} style={styles.grid}>
        <MediaGallery></MediaGallery>
      </Grid>
    </Paper>
  )
}
