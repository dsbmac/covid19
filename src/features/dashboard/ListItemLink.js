import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Link as RouterLink } from "react-router-dom"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import DashboardIcon from "@material-ui/icons/Dashboard"
import { breadcrumbNameMap } from "./breadcrumbNameMap"

export default function ListItemLink(props) {
  const { children, to, open, ...other } = props
  const primary = breadcrumbNameMap[to]
  return (
    <ListItem button component={RouterLink} to={to} {...other}>
      {children}
    </ListItem>
  )
}
