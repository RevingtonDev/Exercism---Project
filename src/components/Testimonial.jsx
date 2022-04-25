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
      return `${diff} minute${diff > 1 ? "s" : ""} ago.`;
    } else if (now.getSeconds() > date.getSeconds()) {
      let diff = now.getSeconds() - date.getSeconds();
      return `${diff} second${diff > 1 ? "s" : ""} ago.`;
    }
  }

  render() {
    return (
      <div className="testimonial">
        <div className="ts-ud">
          <div className="ts-d-lg">
            <div className="lang-lg">
              <img
                src={this.props.track.track.icon_url}
                alt="lang-logo"
                className="lg ts-lang-ico"
              />
            </div>

            <div className="mentor-lg">
              <img
                src={this.props.track.mentor.avatar_url}
                alt="mentor-logo"
                className="lg ts-mentor-ico"
              />
            </div>
          </div>

          <div className="ts-details">
            <div className="ts-det">
              <div className="ts-user">{this.props.track.mentor.handle}</div>
              <div className="ts-exercise">
                on{" "}
                <span className="ts-exercise-title">
                  {this.props.track.exercise.title}
                </span>{" "}
                in{" "}
                <span className="ts-user-track">
                  {this.props.track.track.title}
                </span>
                .
              </div>
            </div>
          </div>
        </div>

        <div className="ts-d-content">{this.props.track.content}</div>

        <div className="ts-last">
          <div className="ts-date">{this.updated}</div>

          <a href={this.props.link} className="ts-link">
            <svg
              version="1.1"
              id="ts-capa"
              width={24}
              height={24}
              viewBox="0 0 492.432 492.432"
            >
              <g id="XMLID_134_">
                <path
                  id="ts-arrow"
                  strokeWidth={1.5}
                  d="M142.238,492.432c-9.79,0-19.588-3.736-27.05-11.209c-14.945-14.934-14.945-39.162,0-54.098l180.9-180.909
		l-180.9-180.91c-14.945-14.935-14.945-39.163,0-54.098c14.926-14.944,39.172-14.944,54.098,0l207.96,207.958
		c14.943,14.935,14.943,39.164,0,54.1l-207.96,207.957C161.824,488.697,152.026,492.432,142.238,492.432z"
                />
              </g>
            </svg>
          </a>
        </div>
      </div>
    );
  }
}
