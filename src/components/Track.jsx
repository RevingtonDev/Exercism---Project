import { Component } from "react";

import "../styles/track.css";

import { badges } from "./Images";
import { ThemeContext } from "../theme/ThemeContext";

export class Track extends Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div
        className={
          "ts-track " +
          (this.props.track === undefined ? "ts-clear-track" : "ts-nm-track")
        }
        onClick={() => this.props.change(this.props.track)}
      >
        {" "}
        {this.props.track === undefined ? (
          <div className="ts-track-logo"> {badges}</div>
        ) : (
          <img
            className="ts-track-logo"
            src={this.props.track.icon_url}
            alt={this.props.track.slug}
          />
        )}
        {this.props.track === undefined ? (
          <div className="track-clear">Clear</div>
        ) : (
          ""
        )}
        {this.props.track === undefined ? (
          ""
        ) : (
          <div className="ts-track-title">
            {" "}
            {this.props.track.title}
            <div className="ts-tes-count">
              {this.props.testimonials}&nbsp;Testimonials
            </div>{" "}
          </div>
        )}
      </div>
    );
  }
}
