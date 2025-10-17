import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

const TestMap = ({ height = '500px' }) => {
  return (
    <div style={{ height, width: '100%', border: '2px solid #2E7D32', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
        center={[23.2599, 77.4126]} // Madhya Pradesh
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[23.2599, 77.4126]}>
          <Popup>
            <strong>Madhya Pradesh</strong><br />
            Forest Rights Implementation Center
          </Popup>
        </Marker>
        <Marker position={[23.3599, 77.5126]}>
          <Popup>
            <strong>Sample FRA Claim</strong><br />
            Status: Approved<br />
            Type: Individual Forest Rights
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default TestMap;