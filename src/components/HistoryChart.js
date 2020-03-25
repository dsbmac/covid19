import React from "react"
import { useTheme } from "@material-ui/core/styles"
import {
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts"
import Title from "../features/dashboard/Title"

export default function Country(props) {
  const { title, data } = props
  const theme = useTheme()
  return (
    <>
      <Title>{title}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="Date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
              }}
            >
              Cases (Confirmed)
            </Label>
          </YAxis>
          <CartesianGrid vertical={false} />

          <Line
            type="monotone"
            dataKey="Cases"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
