import { Component } from "react";

import { ThemeContext } from "../theme/ThemeContext";

/**
 * This is rendered in pagination.
 *
 * used to render page navigational buttons.
 */
export class Jump extends Component {
  static contextType = ThemeContext;
  render() {
    let theme = this.context ? "lt" : "drk";
    return (
      <div
        className={
          "ts-pg " +
          // ( === ) sign cannot be used in this condition. Ignore the warning.
          // eslint-disable-next-line
          (this.props.current == this.props.val ? "crc " : "") +
          theme
        }
        onClick={() => {
          // sets current page to specified value.
          this.props.jump(this.props.val);
        }}
      >
        {this.props.val}
      </div>
    );
  }
}
