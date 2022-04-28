import React, { Component } from "react";

import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";

export class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    );
  }
}
