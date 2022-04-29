import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import React from "react";

import { Navbar } from "./Navbar";

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

it("Navbar component test with theme changing event", () => {
  const theme = {
    isLight: true,
  };

  const changeTheme = () => {
    theme.isLight = !theme.isLight;
  };

  act(() => {
    render(<Navbar changeTheme={changeTheme} />, container);
  });

  const themeChanger = container.getElementsByClassName("ntm")[1];

  act(() => {
    themeChanger.dispatchEvent(new MouseEvent("click"));
  });

  expect(theme.isLight).toBe(true);
});
