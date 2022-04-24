import { Component } from "react";

import "../styles/ts.css";

export class Testimonial extends Component {
  constructor(props) {
    super(props);
    this.updated = this.getUpdated(new Date(props.track.created_at));
  }

  getUpdated(date) {
    let now = new Date();
    if (now.getFullYear() > date.getFullYear()) {
      let diff = now.getFullYear() - date.getFullYear();
      return `${diff} year${diff > 1 ? "s" : ""} ago.`;
    } else if (now.getMonth() > date.getMonth()) {
      let diff = now.getMonth() - date.getMonth();
      return `${diff} month${diff > 1 ? "s" : ""} ago.`;
    } else if (now.getDate() > date.getDate()) {
      let diff = now.getDate() - date.getDate();
      return `${diff} day${diff > 1 ? "s" : ""} ago.`;
    } else if (now.getHours() > date.getHours()) {
      let diff = now.getHours() - date.getHours();
      return `${diff} hour${diff > 1 ? "s" : ""} ago.`;
    } else if (now.getMinutes() > date.getMinutes()) {
      let diff = now.getMinutes() - date.getMinutes();
      return `${diff} minute${diff > 1 ? "s" : ""}s ago.`;
    } else if (now.getSeconds() > date.getSeconds()) {
      let diff = now.getSeconds() - date.getSeconds();
      return `${diff} second${diff > 1 ? "s" : ""} ago.`;
    }
  }

  render() {
    return (
      <div className="testimonial">
        <div className="ts-d-lg">
          <div className="lang-lg">
            <img
              src={this.props.track.track.icon_url}
              alt="lang-logo"
              className="lg"
            />
          </div>

          <div className="mentor-lg">
            <img
              src={this.props.track.mentor.avatar_url}
              alt="mentor-logo"
              className="lg"
            />
          </div>
        </div>

        <div className="ts-details">
          <div className="ts-user">{this.props.track.mentor.handle}</div>
          on {this.props.track.exercise.title} in{" "}
          <span className="ts-user-track">{this.props.track.track.title}</span>.
        </div>

        <div className="ts-d-content">{this.props.track.content}</div>

        <div className="ts-date">{this.updated}</div>
      </div>
    );
  }
}
