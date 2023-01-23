import React, { useRef, useEffect, useState } from 'react';
import mapboxGl from 'mapbox-gl';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ArcLayer } from '@deck.gl/layers';
import './../style.css';

function Arc() {
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

  const arcLayer = new MapboxLayer({
    id: 'deckgl-connections2',
    type: ArcLayer,
    data: [
      {
        inbound: 34345,
        outbound: 54545,
        from: {
          name: 'Tehran',
          coordinates: [51.3857, 35.6102],
        },
        to: {
          name: 'Sari',
          coordinates: [53.09391897064833, 36.57899032166944],
        },
      },
      {
        inbound: 34345,
        outbound: 54545,
        from: {
          name: 'Tehran',
          coordinates: [51.3857, 35.6102],
        },
        to: {
          name: 'Qazvin',
          coordinates: [49.994342476279826, 36.288656997961965],
        },
      },
      {
        inbound: 34345,
        outbound: 54545,
        from: {
          name: 'Tehran',
          coordinates: [51.3857, 35.6102],
        },
        to: {
          name: 'Qom',
          coordinates: [50.895807325975454, 34.644863566733875],
        },
      },
    ],
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getSourceColor: [255, 0, 128],
    getTargetColor: [0, 200, 255],
    getWidth: 2,
    getTooltip: (d) => d.to.name,
  });

  const initializeMap = () => {
    const map = new mapboxGl.Map({
      container: mapRef.current || '',
      style: `https://map.ir/vector/styles/main/mapir-xyz-light-style.json`,
      center: [51.395, 36.024],
      zoom: 6,
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

    const fullScreen = new mapboxGl.FullscreenControl()

    map.once('load', () => {
      map.resize();
      map.addLayer(arcLayer);
      !map.hasControl(fullScreen) && map.addControl(fullScreen);
    });
  }

  useEffect(() => {
    if (!mapValue) initializeMap();
  }, [mapValue]);

  return <div id="map" ref={mapRef} />;
}

export default Arc;
