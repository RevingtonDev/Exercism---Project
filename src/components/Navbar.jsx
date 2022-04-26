import React, { Component } from "react";

import "../styles/nv.css";

import { ThemeContext } from "../theme/ThemeContext";

import {
  dashboard,
  tracks,
  mentoring,
  contribute,
  notifications,
  reputation,
  more_vertical,
  exercism_with_text,
  testimonials,
  badges,
} from "./Images";

import defaultUser from "../images/default-user.jpg";

export class Navbar extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context ? "lt" : "drk";

    return (
      <div className="page">
        {" "}
        <section className={"nv-bar " + theme}>
          {" "}
          <div className="nv-view">
            {" "}
            <div className={"title " + theme}> {exercism_with_text}</div>{" "}
            <ul className="nv-navigation">
              {" "}
              <li className={"nv-link dashboard " + theme}>
                {" "}
                <div className="nv-link-logo"> {dashboard}</div>{" "}
                <div className="nv-link-lk">Dashboard</div>{" "}
              </li>{" "}
              <li className={"nv-link tracks " + theme}>
                {" "}
                <div className="nv-link-logo"> {tracks}</div>{" "}
                <div className="nv-link-lk">Tracks</div>{" "}
              </li>{" "}
              <li className={"nv-link mentoring " + theme}>
                {" "}
                <div className="nv-link-logo"> {mentoring}</div>{" "}
                <div className="nv-link-lk">Mentoring</div>{" "}
              </li>{" "}
              <li className={"nv-link contribute " + theme}>
                {" "}
                <div className="nv-link-logo"> {contribute}</div>{" "}
                <div className="nv-link-lk">Contribute</div>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
          <div className="nv-controlls">
            {" "}
            <section className={"nv-btn-s " + theme}>
              {" "}
              <div className="nv-btn nrm"> {testimonials}</div>{" "}
              <div className="nv-btn nrm"> {badges}</div>{" "}
              <div className={"nv-btn ntm " + theme}> {notifications}</div>{" "}
              <div
                className={"nv-btn ntm " + theme}
                onClick={() => {
                  this.props.changeTheme();
                }}
              >
                <div className={"theme-main-circle " + theme}>
                  <span className={"theme-light-shine shine1 " + theme}></span>
                  <span className={"theme-light-shine shine2 " + theme}></span>
                  <span className={"theme-light-shine shine3 " + theme}></span>
                  <span className={"theme-light-shine shine4 " + theme}></span>
                  <span className={"theme-light-shine shine5 " + theme}></span>
                  <span className={"theme-light-shine shine6 " + theme}></span>
                  <span className={"theme-light-shine shine7 " + theme}></span>
                  <span className={"theme-light-shine shine8 " + theme}></span>
                </div>
                <div className={"theme-helping-circle " + theme}></div>
              </div>
            </section>{" "}
            <section className={"nv-user-control " + theme}>
              {" "}
              <div className={"nv-reputation " + theme}>
                {" "}
                {reputation}
                <span className="nv-rep-val">300</span>{" "}
              </div>{" "}
              <img
                className="nv-user-dp"
                src={defaultUser}
                width="40"
                height="40"
                alt="User"
              />{" "}
              {more_vertical}
            </section>{" "}
          </div>{" "}
        </section>{" "}
        <section className="pg-content"> {this.props.children}</section>{" "}
      </div>
    );
  }
}
