import React from 'react';
import './App.css';

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./content/route"

function App() {
  return (
    <>
      <Router>
        <Routes />
      </Router>

    </>
  );
}

export default App;
