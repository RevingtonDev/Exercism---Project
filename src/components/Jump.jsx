import { Component } from "react";

export class Jump extends Component {
  render() {
    return (
      <div
        className={
          "ts-pg " + (this.props.current === this.props.val ? "crc" : "")
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
