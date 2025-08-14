import { useState } from 'react';
import MapContainer from './components/Map/MapContainer';
import ConversionForm from './components/ConversionForm/ConversionForm';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const [markerCoords, setMarkerCoords] = useState<[number, number] | null>(null);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleAddToMap = (coords: { lat: number; lon: number }) => {
    setMarkerCoords([coords.lon, coords.lat]);
    handleCloseForm();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <MapContainer markerCoords={markerCoords} />

      <button
        onClick={handleOpenForm}
        className="absolute bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-110 z-10"
        aria-label="Open coordinate converter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </button>

      <ConversionForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onAddToMap={handleAddToMap}
      />
    </div>
  );
}

export default App;