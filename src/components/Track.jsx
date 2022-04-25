import { Component } from "react";

import "../styles/track.css";

export class Track extends Component {
  render() {
    return (
      <div
        className={
          "ts-track " +
          (this.props.track.title === undefined
            ? "ts-clear-track"
            : "ts-nm-track")
        }
        onClick={() => this.props.change(this.props.track)}
      >
        {" "}
        <img
          className="ts-track-logo"
          src={this.props.track.icon_url}
          alt={this.props.track.slug}
        />{" "}
        {this.props.track.title === undefined ? (
          <div className="track-clear">Clear</div>
        ) : (
          ""
        )}
        {this.props.track.title === undefined ? (
          ""
        ) : (
          <div className="ts-track-title">
            {this.props.track.title}
            <div className="ts-tes-count">
              {this.props.testimonials} Testimonials
            </div>
          </div>
        )}
      </div>
    );
  }
}
