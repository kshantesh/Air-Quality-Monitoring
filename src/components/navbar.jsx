import React, { Component } from "react";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <a class="navbar-brand " href="#">
          Air Quality Monitoring Website
        </a>
      </nav>
    );
  }
}

export default Navbar;
