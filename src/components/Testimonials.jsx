import React, { Component, createRef } from "react";

import { Testimonial } from "./Testimonial";
import { Track } from "./Track";
import { Jump } from "./Jump";

import { getTestimonials, getTracks } from "../api/retrieve";

import "../styles/ts.css";

import { badges, testimonials, chevron_down, search } from "./Images";
import { ThemeContext } from "../theme/ThemeContext";

export class Testimonials extends Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
    this.state = {
      dataRetrieved: false,
      page: 1,
      sort: 0,
      pages: 0,
      search: null,
      track: null,
      sortSelectorShowing: false,
      trackSelectorShowing: false,
    };
    this.search = createRef();
    this.sort_selector = createRef();
    this.track_container = createRef();
    this.data = [];
    this.tracks = [];
    this.track_counts = {};
    this.errors = [];
    this.tracksContainingTestimonials = [];
    this.searchValue = "";
    this.setPage = this.setPage.bind(this);
    this.setCurrentTrack = this.setCurrentTrack.bind(this);
  }

  componentDidMount() {
    this.retrieveData();
  }

  changeSortSelectorState() {
    this.setState({ sortSelectorShowing: !this.state.sortSelectorShowing });
  }

  changeTrackSelectorState() {
    this.setState({ trackSelectorShowing: !this.state.trackSelectorShowing });
  }

  retrieveData() {
    setTimeout(() => {
      getTestimonials(
        this.state.page,
        this.state.track,
        this.state.search,
        this.state.sort
      )
        .then((res) => {
          this.setState({ pages: res.testimonials.pagination.total_pages });
          this.data = [];
          this.tracksContainingTestimonials = res.testimonials.tracks;
          this.track_counts = res.testimonials.track_counts;
          res.testimonials.results.forEach((track) => {
            this.data.push(
              <Testimonial className="ts-track" key={track.id} track={track} />
            );
          });
          if (this.data.length < 1) {
            this.data.push(
              <div className={"ts-no-result " + (this.context ? "lt" : "drk")}>
                No Results Found.
              </div>
            );
          }
        })
        .finally(() => {
          this.dataRetrieved(true);
          if (this.tracks.length < 1) {
            this.retrieveTracks();
          }
        });
    }, 1000);
  }

  retrieveTracks() {
    getTracks().then(({ tracks }) => {
      this.tracks = [];
      this.tracks.push(<Track change={this.setCurrentTrack} key={0} />);
      tracks.forEach((track) => {
        if (this.tracksContainingTestimonials.includes(track.slug)) {
          this.tracks.push(
            <Track
              change={this.setCurrentTrack}
              key={track.slug}
              track={track}
              testimonials={this.track_counts[track.slug]}
            />
          );
        }
      });
    });
  }

  setCurrentTrack(track) {
    this.changeTrackSelectorState();
    if (this.state.track !== (track === undefined ? null : track)) {
      this.setState({
        page: 1,
        pages: 1,
        track: track === undefined ? null : track,
        dataRetrieved: false,
      });
      this.retrieveData();
    }
  }

  setSearchParam(param) {
    if (this.searchValue !== param) {
      this.searchValue = param;
      this.setState({ page: 1, pages: 1, search: param, dataRetrieved: false });
      this.retrieveData();
    }
  }

  dataRetrieved(isRetrieved) {
    this.setState({ dataRetrieved: isRetrieved });
  }

  setPage(num) {
    this.setState({ page: num, dataRetrieved: false });
    this.retrieveData();
  }

  changeSort(sort, show) {
    if (this.state.sort !== sort) {
      this.sort_selector.current.innerHTML = show;
      this.sort_selector.current.blur();
      this.setState({ page: 1, pages: 1, sort: sort, dataRetrieved: false });
      this.retrieveData();
    }
  }

  render() {
    let theme = this.context ? "lt" : "drk";
    let tableData;
    if (this.state.dataRetrieved) {
      tableData = this.data;
    } else {
      tableData = (
        <div className="ts-load">
          <div className="ts-circle-cover">
            <div className={"ts-load-circle c1 " + theme}></div>
          </div>
          <div className="ts-circle-cover">
            <div className={"ts-load-circle c2 " + theme}></div>
          </div>
          <div className="ts-circle-cover">
            <div className={"ts-load-circle c3 " + theme}></div>
          </div>
          <div className="ts-circle-cover">
            <div className={"ts-load-circle c4 " + theme}></div>
          </div>
        </div>
      );
    }

    let jumpButtons = [];
    if (this.state.page < 3) {
      for (let i = 1; i <= Math.min(this.state.pages, 5); i++) {
        jumpButtons.push(
          <Jump current={this.state.page} key={i} jump={this.setPage} val={i} />
        );
      }
    } else if (this.state.pages - 3 <= this.state.page) {
      for (let i = this.state.pages - 5; i <= this.state.pages; i++) {
        jumpButtons.push(
          <Jump current={this.state.page} key={i} jump={this.setPage} val={i} />
        );
      }
    } else {
      for (let i = this.state.page - 2; i <= this.state.page + 2; i++) {
        jumpButtons.push(
          <Jump current={this.state.page} key={i} jump={this.setPage} val={i} />
        );
      }
    }
    return (
      <div className={"ts-content " + theme}>
        <div className="ts-logo">
          <div className={"ts-badges ts-badges-rot " + theme}>{badges}</div>
          <div className={"ts-testimonials " + theme}>{testimonials}</div>
        </div>
        <div className={"ts-head " + theme}>Testimonials I've left.</div>
        <div className={"ts-lg " + theme}>
          {chevron_down}
          {chevron_down}
          {chevron_down}
        </div>

        <div className={"ts-table " + theme}>
          <div className={"ts-table-head " + theme}>
            <div className="ts-sort-track">
              <div
                onClick={() => {
                  this.changeTrackSelectorState();
                }}
                className="ts-sort-track-lg"
              >
                {this.state.track === null ? (
                  <div className="ts-lg-track">
                    <div className={"ts-logo-track " + theme}>{badges}</div>
                    <div className={"ts-logo-tes " + theme}>{testimonials}</div>
                  </div>
                ) : (
                  <img
                    src={this.state.track.icon_url}
                    alt="Icon"
                    className="ts-logo-track"
                  />
                )}
                <div
                  className={
                    "ts-track-drop-down " +
                    (this.state.trackSelectorShowing ? "up " : "down ") +
                    theme
                  }
                >
                  {chevron_down}
                </div>
              </div>

              <div
                ref={this.track_container}
                className={
                  "ts-track-container " +
                  (this.state.trackSelectorShowing
                    ? "ts-track-selector-show"
                    : "ts-track-selector-hide")
                }
              >
                {this.tracks.map((track) => {
                  return track;
                })}
              </div>
            </div>{" "}
            <div className="ts-sort">
              <div
                className={"ts-sort-value " + theme}
                ref={this.sort_selector}
                onClick={() => {
                  this.changeSortSelectorState();
                }}
              >
                {this.state.sort === 0 ? "Sort by Newest" : "Sort by Oldest"}
              </div>
              <div
                className={
                  "ts-sort-selector " +
                  (this.state.sortSelectorShowing
                    ? "ts-sort-selector-show "
                    : "ts-sort-selector-hide ") +
                  theme
                }
              >
                <div
                  onClick={() => {
                    this.changeSortSelectorState();
                    this.changeSort(0, "Sort by Newest");
                  }}
                  className={"ts-selector-item " + theme}
                >
                  Sort by Newest
                </div>
                <div
                  onClick={() => {
                    this.changeSortSelectorState();
                    this.changeSort(1, "Sort by Oldest");
                  }}
                  className={"ts-selector-item " + theme}
                >
                  Sort by Oldest
                </div>
              </div>
            </div>
            <div className={"ts-search " + theme}>
              {search}

              <input
                className="ts-search-input"
                type="text"
                name="search"
                ref={this.search}
                onFocus={() => (this.searchValue = this.search.current.value)}
                onBlur={() => {
                  this.setSearchParam(this.search.current.value);
                }}
                onKeyUp={(evt) => {
                  if (evt.key === "Enter") {
                    this.search.current.blur();
                  }
                }}
                placeholder="Filter by exercise title."
              />
            </div>
          </div>
          <div className={"ts-table-data " + theme}>{tableData}</div>
          <div className={"ts-navigation " + theme}>
            <div
              className={
                "ts-nav-btn " +
                (this.state.page === 1 ? "ts-disabled " : "ts-enabled ")
              }
              onClick={() => {
                if (this.state.page > 1) {
                  this.setPage(this.state.page - 1);
                }
              }}
            >
              Previous
            </div>
            <div className="ts-pg-num">
              {jumpButtons.map((btn) => {
                return btn;
              })}
            </div>
            <div
              className={
                "ts-nav-btn " +
                (this.state.page === this.state.pages || this.state.pages <= 1
                  ? "ts-disabled"
                  : "ts-enabled")
              }
              onClick={() => {
                if (this.state.page < this.state.pages) {
                  this.setPage(this.state.page + 1);
                }
              }}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    );
  }
}
