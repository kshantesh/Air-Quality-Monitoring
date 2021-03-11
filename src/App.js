import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import History from "./components/table";
import React, { Component } from "react";
import ButtonFilter from "./components/buttonfilter";

import Graph from "./components/graph";
import Navbar from "./components/navbar";
const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      //these are used for list groups and as keys
      AQFactors: ["All", "humidity", "temperature", "pm25"],
      // used for selecting active selection in listgroup
      selectedAQFactor: "",
      //tableDefaultColumns are always there no matter table
      tableDefaultColumns: ["createdAt", "location"],
      //by default all columns are present in table
      newColumns: ["createdAt", "location", "humidity", "temperature", "pm25"],
    };
  }
  componentDidMount() {
    //refreshes the request in every 10 seconds
    this.interval = setInterval(
      () =>
        //get request
        axios
          .get("http://localhost:4000/api/")
          .then((response) => {
            this.setState({ data: response.data });
          })
          .catch(function (error) {
            // handle error
            console.error("problem in restAPi connection");
          })
          .then(function () {
            // always executed
          }),
      //time (10 s)
      10000
    );
  }
  componentWillUnmount() {
    //to prevent memory leaking and showing same data on screen again and again
    clearInterval(this.interval);
  }
  //it handles when a factor is clicked on listgroup
  // temp is used because if original varaible is used it changes the source and original data
  onFactorSelect = (selectedFactor) => {
    if (selectedFactor === "All") {
      this.setState({
        newColumns: [
          "createdAt",
          "location",
          "humidity",
          "temperature",
          "CO",
          "CO2",
          "pm25",
        ],
        selectedAQFactor: selectedFactor,
      });
    } else {
      const { tableDefaultColumns } = this.state;
      const tempTableDefaultColumns = [...tableDefaultColumns];
      tempTableDefaultColumns.push(selectedFactor);
      this.setState({
        newColumns: tempTableDefaultColumns,
        selectedAQFactor: selectedFactor,
      });
    }
  };
  render() {
    const { data, AQFactors, selectedAQFactor, newColumns } = this.state;
    return (
      <div>
        <Navbar></Navbar>
        <div className="container-fluid ">
          <div className="row">
            <ButtonFilter
              factors={AQFactors}
              selectedFactor={selectedAQFactor}
              onFactorSelect={this.onFactorSelect}
            ></ButtonFilter>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
              <Graph data={data} newColumns={newColumns}></Graph>
              <History data={data} newColumns={newColumns}></History>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
