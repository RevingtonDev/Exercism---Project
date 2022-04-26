import { Component } from "react";

import { ThemeContext } from "../theme/ThemeContext";

export class Jump extends Component {
  static contextType = ThemeContext;
  render() {
    let theme = this.context ? "lt" : "drk";
    return (
      <div
        className={
          "ts-pg " +
          (this.props.current === this.props.val ? "crc " : "") +
          theme
        }
        onClick={() => {
          if (this.props.val !== "...") this.props.jump(this.props.val);
        }}
      >
        {this.props.val}
      </div>
    );
  }
}
