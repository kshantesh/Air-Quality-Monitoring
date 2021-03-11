import React, { Component } from "react";
const axios = require("axios");
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.interval = setInterval(
      () =>
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
      10000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { data, newColumns } = this.props;

    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {/* for dynamically changing te no of columns we take props from apps */}
              {newColumns.map((columnName) => (
                <th scope="col">{columnName}</th>
              ))}
            </tr>
          </thead>
          {data.map((data) => (
            <tbody>
              <tr>
                {/* the colums are used as keys for objects in array of objects */}
                {newColumns.map((columnName) => (
                  <td>{data[columnName]}</td>
                ))}
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}

export default History;
