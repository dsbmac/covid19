import React from "react"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import { makeStyles } from "@material-ui/core/styles"
import DashboardIcon from "@material-ui/icons/Dashboard"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import PeopleIcon from "@material-ui/icons/People"
import BarChartIcon from "@material-ui/icons/BarChart"
import LayersIcon from "@material-ui/icons/Layers"
import { useSelector, useDispatch } from "react-redux"
import ListItemLink from "./ListItemLink"
import { fetchCountryStatus } from "../counter/counterSlice"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const useRouterBreadcrumbStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

function BreadMenuItems() {
  const classes = useRouterBreadcrumbStyles()

  const [open2, setOpen2] = React.useState(true)

  const handleClick = () => {
    setOpen2((prevOpen) => !prevOpen)
  }

  return (
    <List>
      <ListItemLink to="/inbox" open={open2} onClick={handleClick} />
      <Collapse component="li" in={open2} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItemLink to="/inbox/important" className={classes.nested} />
        </List>
      </Collapse>
      <ListItemLink to="/deaths" />
      <ListItemLink to="/spam" />
    </List>
  )
}

const SideDrawer = (props) => {
  const classes = useStyles()
  const { open, handleClick } = props
  const [open2, setOpen2] = React.useState(true)
  const dispatch = useDispatch()

  const handleClick2 = () => {
    setOpen2((prevOpen) => !prevOpen)
  }
  const handleFetch = (country, status) => {
    dispatch(fetchCountryStatus(country, status))
  }
  return (
    <List>
      <ListItemLink to="/map">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Map" />
      </ListItemLink>
      <ListItemLink to="/summary" open={open2} onClick={handleClick2}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Summary" />
      </ListItemLink>
      <Collapse component="li" in={open2} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItemLink to="/summary/world" className={classes.nested}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="World" />
          </ListItemLink>{" "}
          <ListItemLink to="/summary/country" className={classes.nested}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="By Country" />
          </ListItemLink>
        </List>
      </Collapse>
      <ListItemLink to="/history">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItemLink>
      <ListItemLink to="/visuals">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Visuals" />
      </ListItemLink>
      <ListItemLink
        to="/deaths"
        onClick={() => {
          handleFetch("china", "deaths")
        }}
      />
      <ListItemLink to="/spam">
        <ListItemText primary="Spam" />
      </ListItemLink>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
    </List>
  )
}

export default SideDrawer
