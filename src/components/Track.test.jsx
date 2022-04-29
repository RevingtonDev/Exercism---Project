import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import React from "react";

import { Track } from "./Track";

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Track component test", () => {
  const track = {
      icon_url: "http://example.com/icon_url",
      slug: "slug",
      title: "title",
    },
    testimonials = 5;
  act(() => {
    render(<Track testimonials={testimonials} track={track} />, container);
  });
  expect(container.getElementsByClassName("ts-track-logo")[0].src).toBe(
    track.icon_url
  );
  expect(container.getElementsByClassName("ts-track-logo")[0].alt).toBe(
    track.slug
  );
  expect(
    container.getElementsByClassName("ts-track-title")[0].innerHTML
  ).toEqual(
    `${track.title} <div class="ts-tes-count">${testimonials}&nbsp;Testimonials</div>`
  );
});
