import { Component } from "react";

import { Navbar } from "./Navbar";
import { Testimonials } from "./Testimonials";

export class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Navbar>
          <Testimonials />
        </Navbar>
      </div>
    );
  }
}
