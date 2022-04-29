import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import React from "react";

import { Testimonial } from "./Testimonial";

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

it("Testimonial component test", () => {
  const mock = {
    track: { icon_url: "http://example.com/track", title: "Track" },
    mentor: { avatar_url: "http://example.com/avatar", handle: "Handle" },
    exercise: { icon_url: "http://example.com/exercise", title: "eTitle" },
    content: "Hello, Testimonial.",
    link: "http://example.com/link",
  };
  act(() => {
    render(<Testimonial track={mock} />, container);
  });

  expect(container.getElementsByClassName("ts-lang-ico")[0].src).toBe(
    mock.track.icon_url
  );
  expect(container.getElementsByClassName("ts-mentor-ico")[0].src).toBe(
    mock.mentor.avatar_url
  );
  expect(
    container.getElementsByClassName("ts-exercise-title")[0].textContent
  ).toBe(mock.exercise.title);
  expect(container.getElementsByClassName("ts-user-track")[0].textContent).toBe(
    mock.track.title
  );
  expect(container.getElementsByClassName("ts-exercise-icon")[0].src).toBe(
    mock.exercise.icon_url
  );
  expect(container.getElementsByClassName("ts-d-content")[0].textContent).toBe(
    mock.content
  );
  expect(container.getElementsByClassName("ts-link")[0].href).toBe(mock.link);
});
