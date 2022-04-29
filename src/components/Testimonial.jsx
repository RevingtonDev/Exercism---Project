import React, { Component } from "react";

import "../styles/ts.css";
import { arrow_right } from "./Images";

/*
  This is rendered in Testimonials table.

  used to show a single testimonial.
*/
export class Testimonial extends Component {
  constructor(props) {
    super(props);
    this.updated = this.getUpdated(new Date(props.track.created_at));
  }

  /*
    returns how much time before this testimonial was updated.

    after 12pm every testimonial that has been uploaded will be shown as 1 day before; regardless of time.
  */
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
                className="lg ts-lang-ico"
                src={this.props.track.track.icon_url}
                alt="lang-logo"
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
                on&nbsp;
                <span className="ts-exercise-title">
                  {this.props.track.exercise.title}
                </span>
                &nbsp; in&nbsp;
                <span className="ts-user-track">
                  {this.props.track.track.title}
                </span>
                .
                <img
                  src={this.props.track.exercise.icon_url}
                  alt="exercise"
                  className="ts-exercise-icon"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ts-d-content">{this.props.track.content}</div>

        <div className="ts-last">
          <div className="ts-date">{this.updated}</div>

          <a href={this.props.track.link} className="ts-link">
            {arrow_right}
          </a>
        </div>
      </div>
    );
  }
}
