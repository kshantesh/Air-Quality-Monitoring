import React, { Component } from "react";
class ButtonFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { factors, selectedFactor, onFactorSelect } = this.props;

    return (
      <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        {" "}
        <div className="sidebar-sticky">
          <ul class="list-group">
            {factors.map((item) => (
              <li
                className={
                  selectedFactor === item
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => {
                  onFactorSelect(item);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default ButtonFilter;
