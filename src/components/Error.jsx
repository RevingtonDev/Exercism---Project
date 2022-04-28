import { Component } from "react";

import "../styles/err.css";

// This used to render runtime errors(mostly data fetching errors)
export class Error extends Component {
  render() {
    return (
      <div className="err">
        <div className="err-des">{this.props.err}</div>

        <div
          className="close-btn"
          onClick={() => {
            this.props.remove(this.props.index);
          }}
        >
          <span className="close-span"></span>
          <span className="close-span"></span>
        </div>
      </div>
    );
  }
}
