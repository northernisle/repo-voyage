import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const local = process.env.LOCAL;

// This allows the routing to be functional even when run from a local file
const HybridRouter = ({ children }) => {
  return local === 'true' ? (
    <HashRouter>{children}</HashRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  );
};

export default HybridRouter;
