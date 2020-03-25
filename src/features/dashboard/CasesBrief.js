import React from "react"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Title from "./Title"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"

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
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Coronavirus Deaths
        </Typography>
        <Typography variant="h5" component="h2">
          {totalDeaths}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Recovered
        </Typography>
        <Typography variant="body2" component="p">
          {totalRecovered}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Total Cases
        </Typography>
        <Typography variant="body2" component="p">
          {totalConfirmed}
        </Typography>
      </CardContent>
    </Card>
    // <React.Fragment>
    //   <Title>Coronavirus Deaths</Title>
    //   <Typography component="p" variant="h4">
    //     {totalDeaths}
    //   </Typography>
    //   <Typography color="textSecondary" className={classes.depositContext}>
    //     as of {date}
    //   </Typography>
    //   <Typography>Recovered</Typography>
    //   <Typography component="p" variant="h4">
    //     {totalRecovered}
    //   </Typography>
    //   <Typography>Total Cases</Typography>
    //   <Typography component="p" variant="h4">
    //     {totalConfirmed}
    //   </Typography>
    //   <div>
    //     <Link color="primary" href="#" onClick={preventDefault}>
    //       View balance
    //     </Link>
    //   </div>
    // </React.Fragment>
  )
}
