import React, { Component, createRef } from "react";

import { Testimonial } from "./Testimonial";
import { Track } from "./Track";
import { Jump } from "./Jump";

import { getTestimonials, getTracks } from "../api/retrieve";

import "../styles/ts.css";

import badges from "../images/badges.svg";
import testimonials from "../images/testimonials.svg";
import chevron from "../images/chevron-down.svg";
import exercism from "../images/exercism.svg";

export class Testimonials extends Component {
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
              <div className="ts-no-result">No Results Found.</div>
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
      this.tracks.push(
        <Track
          change={this.setCurrentTrack}
          key={0}
          track={{ icon_url: badges }}
        />
      );
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
    this.setState({
      page: 1,
      track: track.title === undefined ? null : track,
      dataRetrieved: false,
    });
    this.retrieveData();
  }

  setSearchParam(param) {
    if (this.searchValue !== param) {
      this.searchValue = param;
      this.setState({ page: 1, search: param, dataRetrieved: false });
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
    this.sort_selector.current.innerHTML = show;
    this.sort_selector.current.blur();
    this.setState({ page: 1, sort: sort, dataRetrieved: false });
    this.retrieveData();
  }

  render() {
    let tableData;
    if (this.state.dataRetrieved) {
      tableData = this.data;
    } else {
      tableData = (
        <div className="ts-load">
          <div className="ts-circle-cover">
            <div className="ts-load-circle c1"></div>
          </div>
          <div className="ts-circle-cover">
            <div className="ts-load-circle c2"></div>
          </div>
          <div className="ts-circle-cover">
            <div className="ts-load-circle c3"></div>
          </div>
          <div className="ts-circle-cover">
            <div className="ts-load-circle c4"></div>
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
      <div className="ts-content">
        <div className="ts-logo">
          <div className="ts-badges">
            <img
              className="ts-badges-rot"
              src={badges}
              width="100"
              height="100"
              alt="Badges-logo"
            />
          </div>
          <div className="ts-testimonials">
            <img
              src={testimonials}
              width="40"
              height="40"
              alt="Testimonials-logo"
            />
          </div>
        </div>
        <div className="ts-head">Testimonials I've left.</div>
        <div className="ts-lg">
          <img src={chevron} width="25" height="25" alt="chevron-down" />
          <img src={chevron} width="25" height="25" alt="chevron-down" />
          <img src={chevron} width="25" height="25" alt="chevron-down" />
        </div>

        <div className="ts-table">
          <div className="ts-table-head">
            <div className="ts-search-track">
              <div
                onClick={() => {
                  this.changeTrackSelectorState();
                }}
                className="ts-search-lg"
              >
                <img
                  className="ts-logo-track"
                  src={
                    this.state.track === null
                      ? badges
                      : this.state.track.icon_url
                  }
                  alt="Badges"
                />
                <img
                  className={
                    "ts-logo-tes " +
                    (this.state.track === null
                      ? "ts-logo-tes-show"
                      : "ts-logo-tes-hide")
                  }
                  src={exercism}
                  alt="Badges"
                />
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
            </div>
            <div className="ts-search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#131313"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>

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
            <div className="ts-sort">
              <div
                className="ts-sort-value"
                ref={this.sort_selector}
                onClick={() => {
                  this.changeSortSelectorState();
                }}
              >
                {this.state.sort === 0
                  ? "Sort by Most Recent"
                  : "Sort by Oldest"}
              </div>
              <div
                className={
                  "ts-sort-selector " +
                  (this.state.sortSelectorShowing
                    ? "ts-sort-selector-show"
                    : "ts-sort-selector-hide")
                }
              >
                <div
                  onClick={() => {
                    this.changeSortSelectorState();
                    this.changeSort(0, "Sort by Most Recent");
                  }}
                  className="ts-selector-item"
                >
                  Sort by Most Recent
                </div>
                <div
                  onClick={() => {
                    this.changeSortSelectorState();
                    this.changeSort(1, "Sort by Oldest");
                  }}
                  className="ts-selector-item"
                >
                  Sort by Oldest
                </div>
              </div>
            </div>
          </div>
          <div className="ts-table-data">{tableData}</div>
          <div className="ts-navigation">
            <div
              className={
                "ts-nav-btn " +
                (this.state.page === 1 ? "ts-disabled" : "ts-enabled")
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
