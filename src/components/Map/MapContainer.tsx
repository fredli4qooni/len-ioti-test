import 'ol/ol.css';
import React, { useRef, useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

interface MapContainerProps {
  markerCoords: [number, number] | null;
}

const MapContainer: React.FC<MapContainerProps> = ({ markerCoords }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [markerLayer, setMarkerLayer] = useState<VectorLayer<any> | null>(null);

  useEffect(() => {
    if (mapElement.current && !mapRef.current) {
      const initialMarkerLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: 'rgba(255, 215, 0, 0.9)' }),
            stroke: new Stroke({ color: '#ffffff', width: 2 }),
          }),
        }),
      });
      setMarkerLayer(initialMarkerLayer);

      const initialMap = new Map({
        target: mapElement.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          initialMarkerLayer,
        ],
        view: new View({
          center: fromLonLat([118.015776, -2.600029]),
          zoom: 5,
        }),
        controls: [],
      });

      mapRef.current = initialMap;
    }
  }, []);

  useEffect(() => {
    if (markerCoords && markerLayer) {
      const source = markerLayer.getSource();

      if (source) {
        source.clear();

        const newMarker = new Feature({
          geometry: new Point(fromLonLat(markerCoords)),
        });
        
        source.addFeature(newMarker);

        mapRef.current?.getView().animate({
          center: fromLonLat(markerCoords),
          zoom: 12,
          duration: 1000,
        });
      }
    }
  }, [markerCoords, markerLayer]);

  return (
    <div ref={mapElement} className="w-full h-full"></div>
  );
};

export default MapContainer;