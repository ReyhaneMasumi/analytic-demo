import React, { useRef, useEffect, useState } from 'react';
import mapboxGl from 'mapbox-gl';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ColumnLayer } from '@deck.gl/layers';
import { saderat } from './../data/saderat.js';
import './../style.css';

function Column() {
  let mapRef = useRef(null);
  const [mapValue, setMap] = useState(null);

  if (mapboxGl.getRTLTextPluginStatus() === 'unavailable')
    mapboxGl.setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
      (err) => {
        err && console.error(err);
      },
      true
    );

  const ColLayer = new MapboxLayer({
    id: 'deckgl-connections3',
    type: ColumnLayer,
    data: saderat,
    diskResolution: 12,
    radius: 200,
    extruded: true,
    pickable: true,
    elevationScale: 5000,
    getPosition: (d) => d?.geometry?.coordinates || [0, 0],
    getFillColor: (d) =>
      d.properties['مانده ی جاری سپرده ها'] > 900
        ? [25, 100, 70, 100]
        : d.properties['مانده ی جاری سپرده ها'] > 800
        ? [0, 15, 50, 100]
        : d.properties['مانده ی جاری سپرده ها'] > 700
        ? [0, 30, 65, 100]
        : d.properties['مانده ی جاری سپرده ها'] > 600
        ? [0, 45, 70, 100]
        : d.properties['مانده ی جاری سپرده ها'] > 500
        ? [5, 77, 80, 100]
        : [25, 100, 70, 100],
    getLineColor: [0, 0, 0],
    getElevation: (d) => d.properties['مانده ی جاری سپرده ها'] / 100,
  });

  const initializeMap = () => {
    const map = new mapboxGl.Map({
      container: mapRef.current || '',
      style: `https://map.ir/vector/styles/main/mapir-xyz-light-style.json`,
      center: [51.395, 36.024],
      zoom: 8,
      pitch: 60,
      interactive: true,
      // hash: true,
      attributionControl: true,
      customAttribution: '© Map © Openstreetmap',
      transformRequest: (url) => {
        return {
          url: url,
          headers: {
            'x-api-key':
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRiZWU0YWU4OTk4OTA3MmQ3OTFmMjQ4ZDE5N2VhZTgwZWU2NTUyYjhlYjczOWI2NDdlY2YyYzIzNWRiYThiMzIzOTM5MDkzZDM0NTY2MmU3In0.eyJhdWQiOiI5NDMyIiwianRpIjoiZGJlZTRhZTg5OTg5MDcyZDc5MWYyNDhkMTk3ZWFlODBlZTY1NTJiOGViNzM5YjY0N2VjZjJjMjM1ZGJhOGIzMjM5MzkwOTNkMzQ1NjYyZTciLCJpYXQiOjE1OTA4MjU0NzIsIm5iZiI6MTU5MDgyNTQ3MiwiZXhwIjoxNTkzNDE3NDcyLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.M_z4xJlJRuYrh8RFe9UrW89Y_XBzpPth4yk3hlT-goBm8o3x8DGCrSqgskFfmJTUD2wC2qSoVZzQKB67sm-swtD5fkxZO7C0lBCMAU92IYZwCdYehIOtZbP5L1Lfg3C6pxd0r7gQOdzcAZj9TStnKBQPK3jSvzkiHIQhb6I0sViOS_8JceSNs9ZlVelQ3gs77xM2ksWDM6vmqIndzsS-5hUd-9qdRDTLHnhdbS4_UBwNDza47Iqd5vZkBgmQ_oDZ7dVyBuMHiQFg28V6zhtsf3fijP0UhePCj4GM89g3tzYBOmuapVBobbX395FWpnNC3bYg7zDaVHcllSUYDjGc1A', //dev api key
            'Mapir-SDK': 'reactjs',
          },
        };
      },
    });

    if (!mapValue) setMap(map);

    const fullScreen = new mapboxGl.FullscreenControl();

    map.on('load', () => {
      map.resize();
      map.addLayer(ColLayer);
      !map.hasControl(fullScreen) && map.addControl(fullScreen);
    });
  };

  useEffect(() => {
    if (!mapValue) initializeMap();
  }, [mapValue]);

  return <div id="map" ref={mapRef} />;
}

export default Column;
