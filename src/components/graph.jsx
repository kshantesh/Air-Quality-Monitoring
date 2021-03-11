import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";

class Graph extends Component {
  render() {
    const { data, factors, newColumns } = this.props;
    let a = "createdAt";
    let b = "location";
    let AQfactor;
    [a, b, ...AQfactor] = newColumns;
    const color = {
      humidity: "#3498DB",
      temperature: "#FF6600",
      pm25: "#00CC00",
      CO: "#cf0c0c",
      CO2: "#62a187",
    };
    return (
      <React.Fragment>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={900}
            height={380}
            data={data}
            margin={{
              top: 15,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" tick={false}>
              <Label value="Time" position="bottom" />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            {AQfactor.map((factor) => (
              <Line
                type="monotoneX"
                dataKey={factor}
                stroke={color[factor]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}

export default Graph;
