import React, { useState, useEffect } from 'react';
import { dmsToDd, ddToDms } from '../../utils/coordinateConverter';

interface ConversionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToMap: (coords: { lat: number; lon: number }) => void;
}

type ActiveTab = 'DMS_TO_DD' | 'DD_TO_DMS';

const ConversionForm: React.FC<ConversionFormProps> = ({ isOpen, onClose, onAddToMap }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('DMS_TO_DD');

  // State untuk tab DMS to DD
  const [dmsLat, setDmsLat] = useState({ deg: '', min: '', sec: '', dir: 'N' });
  const [dmsLon, setDmsLon] = useState({ deg: '', min: '', sec: '', dir: 'E' });
  const [ddResult, setDdResult] = useState<{ lat: string; lon: string } | null>(null);

  // State untuk tab DD to DMS
  const [ddLat, setDdLat] = useState('');
  const [ddLon, setDdLon] = useState('');
  const [dmsResult, setDmsResult] = useState<{ lat: string; lon: string } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setDmsLat({ deg: '', min: '', sec: '', dir: 'N' });
      setDmsLon({ deg: '', min: '', sec: '', dir: 'E' });
      setDdResult(null);
      setDdLat('');
      setDdLon('');
      setDmsResult(null);
    }
    setDdResult(null);
    setDmsResult(null);
  }, [isOpen, activeTab]);

  const handleDmsToDdConvert = () => {
    if (!dmsLat.deg || !dmsLat.min || !dmsLat.sec || !dmsLon.deg || !dmsLon.min || !dmsLon.sec) {
      alert('Please fill all DMS fields.');
      return;
    }

    const latDd = dmsToDd(parseFloat(dmsLat.deg), parseFloat(dmsLat.min), parseFloat(dmsLat.sec), dmsLat.dir);
    const lonDd = dmsToDd(parseFloat(dmsLon.deg), parseFloat(dmsLon.min), parseFloat(dmsLon.sec), dmsLon.dir);

    setDdResult({ lat: latDd.toFixed(6), lon: lonDd.toFixed(6) });
  };

  const handleDdToDmsConvert = () => {
    if (!ddLat || !ddLon) {
      alert('Please fill all DD fields.');
      return;
    }
    const latDms = ddToDms(parseFloat(ddLat), 'lat');
    const lonDms = ddToDms(parseFloat(ddLon), 'lon');

    setDmsResult({ lat: latDms, lon: lonDms });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold">
          &times;
        </button>

        <div className="flex border-b border-gray-600 mb-4">
          <button
            onClick={() => setActiveTab('DMS_TO_DD')}
            className={`flex-1 py-2 text-center font-semibold transition-colors duration-300 ${activeTab === 'DMS_TO_DD' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            DMS to DD
          </button>
          <button
            onClick={() => setActiveTab('DD_TO_DMS')}
            className={`flex-1 py-2 text-center font-semibold transition-colors duration-300 ${activeTab === 'DD_TO_DMS' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            DD to DMS
          </button>
        </div>

        {activeTab === 'DMS_TO_DD' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-center">Convert Coordinate DMS to DD</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300">Latitude</label>
              <div className="grid grid-cols-4 gap-2 mt-1">
                <input type="number" placeholder="Deg°" value={dmsLat.deg} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDmsLat({ ...dmsLat, deg: e.target.value })} className="col-span-1 bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="number" placeholder="Min'" value={dmsLat.min} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDmsLat({ ...dmsLat, min: e.target.value })} className="col-span-1 bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="number" placeholder="Sec&quot;" value={dmsLat.sec} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDmsLat({ ...dmsLat, sec: e.target.value })} className="col-span-1 bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select value={dmsLat.dir} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDmsLat({ ...dmsLat, dir: e.target.value })} className="col-span-1 bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>N</option>
                  <option>S</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Longitude</label>
              <div className="grid grid-cols-4 gap-2 mt-1">
                <input type="number" placeholder="Deg°" value={dmsLon.deg} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDmsLon({ ...dmsLon, deg: e.target.value })} className="col-span-1 bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="number" placeholder="Min'" value={dmsLon.min} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDmsLon({ ...dmsLon, min: e.target.value })} className="col-span-1 bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="number" placeholder="Sec&quot;" value={dmsLon.sec} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDmsLon({ ...dmsLon, sec: e.target.value })} className="col-span-1 bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select value={dmsLon.dir} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDmsLon({ ...dmsLon, dir: e.target.value })} className="col-span-1 bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>E</option>
                  <option>W</option>
                </select>
              </div>
            </div>
            <button onClick={handleDmsToDdConvert} className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold transition">Convert</button>
            {ddResult && (
              <div className="bg-gray-700 p-4 rounded mt-4 text-center">
                <p className="text-sm text-gray-400">Decimal Degrees Result</p>
                <p className="font-mono text-lg">Lat: {ddResult.lat}, Lon: {ddResult.lon}</p>
                <button onClick={() => onAddToMap({ lat: parseFloat(ddResult.lat), lon: parseFloat(ddResult.lon) })} className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold">Add to Map</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'DD_TO_DMS' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-center">Convert Coordinate DD to DMS</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300">Latitude (DD)</label>
              <input type="number" placeholder="-90 to 90" value={ddLat} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDdLat(e.target.value)} className="w-full bg-gray-700 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Longitude (DD)</label>
              <input type="number" placeholder="-180 to 180" value={ddLon} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDdLon(e.target.value)} className="w-full bg-gray-700 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button onClick={handleDdToDmsConvert} className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold transition">Convert</button>
            {dmsResult && (
              <div className="bg-gray-700 p-4 rounded mt-4 text-center">
                <p className="text-sm text-gray-400">DMS Result</p>
                <p className="font-mono text-lg">Lat: {dmsResult.lat}</p>
                <p className="font-mono text-lg">Lon: {dmsResult.lon}</p>
                <button onClick={() => onAddToMap({ lat: parseFloat(ddLat), lon: parseFloat(ddLon) })} className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold">Add to Map</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversionForm;