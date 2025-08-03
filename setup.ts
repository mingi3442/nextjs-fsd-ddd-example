import "@testing-library/jest-dom";
import React from "react";

// Make React available globally for JSX
global.React = React;

global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
};
