import React from 'react';
import Column from './layers/column-layer';
import Arc from './layers/arc-layer';
import Hex from './layers/hex-layer';
import Grid from './layers/grid-layer';
import './style.css';

function App() {
  return (
    <div className="map-wrapper">
      <Column />
      <Arc />
      <Hex />
      <Grid />
    </div>
  );
}

export default App;
