import React, { Component, createRef } from "react";

import { Testimonial } from "./Testimonial";
import { Track } from "./Track";
import { Jump } from "./Jump";
import { Error } from "./Error";

import { getTestimonials, getTracks } from "../api/retrieve";

import "../styles/ts.css";

import { badges, testimonials, chevron_down, search } from "./Images";
import { ThemeContext } from "../theme/ThemeContext";

/*
  Testimonials page content.
*/
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
    this.errors = [];
    this.tracksContainingTestimonials = [];
    this.track_counts = {};
    this.searchValue = "";

    this.setPage = this.setPage.bind(this);
    this.setCurrentTrack = this.setCurrentTrack.bind(this);
    this.removeErrorBox = this.removeErrorBox.bind(this);
  }

  // This method is used to append testimonial data when client visits.
  componentDidMount() {
    this.retrieveData();
  }

  // This either (if it's hidden)shows or (if it's shown)hides sort selector box.
  changeSortSelectorState() {
    this.setState({ sortSelectorShowing: !this.state.sortSelectorShowing });
  }

  // This either drops or rolls back the track drop down box.
  changeTrackSelectorState() {
    this.setState({ trackSelectorShowing: !this.state.trackSelectorShowing });
  }

  /*
    This method is used to call testimonial API and append that data to an array(this.data).

    setTimeout() is used only show the loading ui.
  */
  retrieveData() {
    setTimeout(() => {
      getTestimonials(
        this.state.page,
        this.state.track,
        this.state.search,
        this.state.sort
      )
        .catch((e) => {
          this.errors.push(
            <Error
              key={this.errors.length}
              index={this.errors.length}
              remove={this.removeErrorBox}
              err={e.message}
            />
          );
        })
        .then((res) => {
          // sets total page count
          this.setState({ pages: res.testimonials.pagination.total_pages });
          // removes previously retrieved data
          this.data = [];
          // sets tracks which testimonials have been uploaded.
          this.tracksContainingTestimonials = res.testimonials.tracks;
          // sets how many testimonials do each track has.
          this.track_counts = res.testimonials.track_counts;
          res.testimonials.results.forEach((track) => {
            this.data.push(
              <Testimonial className="ts-track" key={track.id} track={track} />
            );
          });
          // if there's no data.
          if (this.data.length < 1) {
            this.data.push(
              <div className={"ts-no-result " + (this.context ? "lt" : "drk")}>
                No Results Found.
              </div>
            );
          }
        })
        .finally(() => {
          // sets data received to true.
          this.dataRetrieved(true);
          // tracks will be receive once per each visit; due to performance reductions.
          if (this.tracks.length < 1) {
            this.retrieveTracks();
          }
        });
    }, 1000);
  }

  // This method is used to call track API.
  retrieveTracks() {
    getTracks()
      .catch((e) => {
        this.errors.push(
          <Error
            key={this.errors.length}
            index={this.errors.length}
            remove={this.removeErrorBox}
            err={e.message}
          />
        );
      })
      .then(({ tracks }) => {
        // clearing tracks array
        this.tracks = [];
        // inserting an undefined track to clear track selection.
        this.tracks.push(<Track change={this.setCurrentTrack} key={0} />);
        tracks.forEach((track) => {
          // this only adds tracks those have at least 1 testimonial
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

  // changes current track selection (could be undefined)
  setCurrentTrack(track) {
    this.changeTrackSelectorState();
    // if track selection from drop down box is equal to current selected track API call won't run.
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

  // changes current search parameter
  setSearchParam(param) {
    if (this.searchValue !== param) {
      this.searchValue = param;
      this.setState({ page: 1, pages: 1, search: param, dataRetrieved: false });
      this.retrieveData();
    }
  }

  // sets data received variable to true;
  dataRetrieved(isRetrieved) {
    this.setState({ dataRetrieved: isRetrieved });
  }

  // changes current page
  setPage(num) {
    this.setState({ page: num, dataRetrieved: false });
    this.retrieveData();
  }

  // changes current sort parameter
  changeSort(sort, show) {
    if (this.state.sort !== sort) {
      this.sort_selector.current.innerHTML = show;
      this.sort_selector.current.blur();
      this.setState({ page: 1, pages: 1, sort: sort, dataRetrieved: false });
      this.retrieveData();
    }
  }

  removeErrorBox(index) {
    this.errors.splice(index);
    this.forceUpdate();
  }

  render() {
    let theme = this.context ? "lt" : "drk";

    // uses to show data or loading animation
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

    // page navigation buttons
    let jumpButtons = [];
    if (this.state.page < 3) {
      for (let i = 1; i <= Math.min(this.state.pages, 4); i++) {
        jumpButtons.push(
          <Jump current={this.state.page} key={i} jump={this.setPage} val={i} />
        );
      }
      if (this.state.pages > 4) {
        jumpButtons.push(
          <div key="last" className={"pag-more " + theme}>
            ...
          </div>
        );
        jumpButtons.push(
          <Jump
            current={this.state.page}
            key={this.state.pages}
            jump={this.setPage}
            val={this.state.pages}
          />
        );
      }
    } else if (this.state.pages - 2 < this.state.page) {
      if (this.state.page > 2) {
        jumpButtons.push(
          <Jump current={this.state.page} key="1" jump={this.setPage} val="1" />
        );
        jumpButtons.push(
          <div key="first" className={"pag-more " + theme}>
            ...
          </div>
        );
      }
      for (
        let i = Math.max(this.state.pages - 2, 2);
        i <= this.state.pages;
        i++
      ) {
        jumpButtons.push(
          <Jump current={this.state.page} key={i} jump={this.setPage} val={i} />
        );
      }
    } else {
      if (this.state.page > 2) {
        jumpButtons.push(
          <Jump current={this.state.page} key="1" jump={this.setPage} val="1" />
        );
        jumpButtons.push(
          <div key="first" className={"pag-more " + theme}>
            ...
          </div>
        );
      }
      for (let i = this.state.page - 1; i <= this.state.page + 1; i++) {
        jumpButtons.push(
          <Jump current={this.state.page} key={i} jump={this.setPage} val={i} />
        );
      }
      jumpButtons.push(
        <div key="last" className={"pag-more " + theme}>
          ...
        </div>
      );
      jumpButtons.push(
        <Jump
          current={this.state.page}
          key={this.state.pages}
          jump={this.setPage}
          val={this.state.pages}
        />
      );
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
        <div className={"err-content " + theme}>
          {this.errors.map((err) => {
            return err;
          })}
        </div>
      </div>
    );
  }
}
