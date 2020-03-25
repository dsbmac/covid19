/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react"
import {
  BrowserRouter,
  Switch,
  Route as BrowserRoute,
  Link as RouterLink,
} from "react-router-dom"
import { Route, MemoryRouter } from "react-router"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import List from "@material-ui/core/List"
import Link from "@material-ui/core/Link"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ExpandMore from "@material-ui/icons/ExpandMore"
import ExpandLess from "@material-ui/icons/ExpandLess"
import clsx from "clsx"
import CssBaseline from "@material-ui/core/CssBaseline"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import Container from "@material-ui/core/Container"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import NotificationsIcon from "@material-ui/icons/Notifications"
import { History } from "../../components/History"
import { Deaths } from "./Deaths"
import { Summary } from "./Summary"
import { Visuals } from "../../components/Visuals"
import Deposits from "./CasesBrief"
import Orders from "./Orders"
// import { useDataContext } from '../../components/useDataContext';
import { FooBreadcrumbs } from "./FooBreadcrumbs"
import SideDrawer from "./SideDrawer"
// import { Counter } from '../features/counter/Counter';
import { breadcrumbNameMap } from "./breadcrumbNameMap"
import {
  fetchCountryStatus,
  selectDayOne,
  selectfetchedData,
  selectIsFetching,
} from "../counter/counterSlice"

// this has to be imported below material ui component imports to preservce css specificity
import { useStyles } from "./useStyles"

function ListItemLink(props) {
  const { to, open, ...other } = props
  const primary = breadcrumbNameMap[to]

  return (
    <ListItem button component={RouterLink} to={to} {...other}>
      <ListItemText primary={primary} />
      {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
    </ListItem>
  )
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
}

const LinkRouter = (props) => <Link {...props} component={RouterLink} />

export default function RouterBreadcrumbs() {
  const classes = useStyles()
  const [isDrawerOpen, setDrawerOpen] = React.useState(true)
  const fetchedData = useSelector(selectfetchedData)
  const isFetching = useSelector(selectIsFetching)

  const [aboveFoldData, setAboveFoldData] = useState([])
  // const { countries, isFetching, hasInitialized } = useDataContext();

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }
  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  return (
    //sets initial dashboard view
    <MemoryRouter initialEntries={["/visuals"]} initialIndex={0}>
      <Route>
        {({ location }) => {
          const pathnames = location.pathname.split("/").filter((x) => x)

          return (
            <div className={classes.root}>
              <CssBaseline />
              <AppBar
                position="absolute"
                className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
              >
                <Toolbar className={classes.toolbar}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="isDrawerOpen drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(
                      classes.menuButton,
                      isDrawerOpen && classes.menuButtonHidden
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                  <FooBreadcrumbs
                    pathnames={pathnames}
                    LinkRouter={LinkRouter}
                    breadcrumbNameMap={breadcrumbNameMap}
                  />
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    Dashboard
                  </Typography>
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                classes={{
                  paper: clsx(
                    classes.drawerPaper,
                    !isDrawerOpen && classes.drawerPaperClose
                  ),
                }}
                open={isDrawerOpen}
              >
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <SideDrawer />
              </Drawer>
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                  {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                  <Switch>
                    <Route path="/summary">
                      <Summary
                        fetchedData={fetchedData}
                        isFetching={isFetching}
                        fixedHeightPaper={fixedHeightPaper}
                        paperStyle={classes.paper}
                        location={location.pathname}
                      ></Summary>
                    </Route>
                    <Route path="/deaths">
                      <Deaths
                        fetchedData={fetchedData}
                        isFetching={isFetching}
                        fixedHeightPaper={fixedHeightPaper}
                      ></Deaths>
                    </Route>
                    <Route path="/history">
                      <History
                        fetchedData={fetchedData}
                        isFetching={isFetching}
                        fixedHeightPaper={fixedHeightPaper}
                      ></History>
                    </Route>
                    <Route path="/visuals">
                      <Visuals
                        fetchedData={fetchedData}
                        isFetching={isFetching}
                        fixedHeightPaper={fixedHeightPaper}
                      ></Visuals>
                    </Route>
                  </Switch>
                </Container>
              </main>
            </div>
          )
        }}
      </Route>
    </MemoryRouter>
  )
}
