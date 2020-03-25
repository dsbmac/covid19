import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"

function FooBreadcrumbs({ pathnames, LinkRouter, breadcrumbNameMap }) {
  return (
    <Breadcrumbs aria-label="breadcrumb" color="inherit">
      <LinkRouter color="inherit" to="/">
        Dashboard
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join("/")}`
        return last ? (
          <Typography color="inherit" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        )
      })}
    </Breadcrumbs>
  )
}

FooBreadcrumbs.propTypes = {
  pathnames: PropTypes.array,
  LinkRouter: PropTypes.func,
  breadcrumbNameMap: PropTypes.object,
}

export { FooBreadcrumbs }
