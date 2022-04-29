import React, { Component } from "react";

import { Navbar } from "./Navbar";
import { Testimonials } from "./Testimonials";
import { ThemeContext } from "../theme/ThemeContext";

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLight: true,
    };
    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme() {
    this.setState({ isLight: !this.state.isLight });
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.isLight}>
        <Navbar changeTheme={this.changeTheme}>
          <Testimonials />
        </Navbar>
      </ThemeContext.Provider>
    );
  }
}
