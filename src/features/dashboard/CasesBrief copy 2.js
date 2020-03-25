import React from "react"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Title from "./Title"

function preventDefault(event) {
  event.preventDefault()
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
})

export default function Cases(props) {
  const { date, totalConfirmed, totalDeaths, totalRecovered } = props
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Coronavirus Deaths</Title>
      <Typography component="p" variant="h4">
        {totalDeaths}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        as of {date}
      </Typography>
      <Typography>Recovered</Typography>
      <Typography component="p" variant="h4">
        {totalRecovered}
      </Typography>
      <Typography>Total Cases</Typography>
      <Typography component="p" variant="h4">
        {totalConfirmed}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  )
}
