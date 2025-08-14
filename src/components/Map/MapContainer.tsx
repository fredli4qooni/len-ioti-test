// src/components/Map/MapContainer.tsx

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
  // useRef untuk elemen div peta
  const mapElement = useRef<HTMLDivElement>(null);
  
  // useState untuk menyimpan instance Map
  const mapRef = useRef<Map | null>(null);

  // useState untuk layer marker
  const [markerLayer, setMarkerLayer] = useState<VectorLayer<any> | null>(null);

  // useEffect untuk inisialisasi peta (HANYA SEKALI)
  useEffect(() => {
    if (mapElement.current && !mapRef.current) {
      // Buat layer untuk marker
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

      // Buat instance peta
      const initialMap = new Map({
        target: mapElement.current,
        layers: [
          new TileLayer({
            source: new OSM(), // Ini yang akan memuat tiles peta
          }),
          initialMarkerLayer, // Tambahkan layer marker ke peta
        ],
        view: new View({
          center: fromLonLat([118.015776, -2.600029]),
          zoom: 5,
        }),
        controls: [],
      });

      // Simpan instance peta di ref agar tidak memicu re-render
      mapRef.current = initialMap;

      // Tidak perlu cleanup di sini karena peta harus tetap ada
    }
  }, []); // Dependency array kosong memastikan ini hanya berjalan sekali

  // useEffect terpisah untuk meng-update marker
  useEffect(() => {
    if (markerCoords && markerLayer) {
      const source = markerLayer.getSource();
      source.clear(); // Hapus marker lama

      const newMarker = new Feature({
        geometry: new Point(fromLonLat(markerCoords)),
      });
      source.addFeature(newMarker);

      // Animasikan view ke marker baru
      mapRef.current?.getView().animate({
        center: fromLonLat(markerCoords),
        zoom: 12,
        duration: 1000,
      });
    }
  }, [markerCoords, markerLayer]); // Jalankan saat koordinat atau layer berubah

  return (
    <div ref={mapElement} className="w-full h-full"></div>
  );
};

export default MapContainer;