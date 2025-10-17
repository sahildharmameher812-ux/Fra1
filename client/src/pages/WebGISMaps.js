import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Button,
  Divider,
  LinearProgress,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Map as MapIcon,
  Satellite,
  Terrain,
  Layers,
  Fullscreen,
  ZoomIn,
  ZoomOut,
  MyLocation,
  Download,
  Share,
  CheckCircle,
  PendingActions,
  Forest,
  Home,
  Water,
  Refresh,
  Nature,
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
// Removed unused imports: motion, AnimatePresence
import { governmentColors } from '../theme/governmentTheme';
import { useLanguage } from '../context/LanguageContext';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

// Component to update map view without remounting
function MapUpdater({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1
    });
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [center, zoom, map]);
  
  return null;
}

const WebGISMaps = () => {
  const { t } = useLanguage();
  // For public access, provide fallback for useLanguage
  const tFallback = (key) => {
    const translations = {
      'mapView': 'Map View',
      'satelliteView': 'Satellite View', 
      'terrainView': 'Terrain View',
      'zoomIn': 'Zoom In',
      'zoomOut': 'Zoom Out',
      'myLocation': 'My Location',
      'fullScreen': 'Full Screen',
      'status': 'Status',
      'area': 'Area',
      'hectares': 'hectares',
      'claimant': 'Claimant',
      'village': 'Village',
      'district': 'District',
      'submitted': 'Submitted',
      'type': 'Type',
      'coverage': 'Coverage',
      'coordinates': 'Coordinates',
      'totalLand': 'Total Land (Ha)',
      'forestAreaHa': 'Forest Area (Ha)',
      'fraClaimsStatus': 'FRA Claims Status',
      'approvedClaims': 'Approved Claims',
      'pendingClaims': 'Pending Claims',
      'rejectedClaims': 'Rejected Claims',
      'document': 'Document',
      'applicants': 'Applicants', 
      'locations': 'Locations',
      'landUse': 'Land Use',
      'forestCoverLabel': 'Forest Cover',
      'submittedAt': 'Submitted At',
      'by': 'By'
    };
    return t ? t(key) : (translations[key] || key);
  };
  const [selectedState, setSelectedState] = useState('mp');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [mapType, setMapType] = useState(0); // 0: Normal, 1: Satellite, 2: Terrain
  const [mapLayers, setMapLayers] = useState({
    fraApproved: true,
    fraPending: true,
    forestCover: true,
    tribalVillages: true,
    waterBodies: false,
    boundaries: true,
    fraRecords: true, // New layer for FRA Atlas records
  });
  const [mapCenter, setMapCenter] = useState([23.2599, 77.4126]);
  const [mapZoom, setMapZoom] = useState(7);
  const [fraRecords, setFraRecords] = useState([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const mapRef = useRef();

  // States and Districts Data
  const statesData = {
    mp: {
      name: 'Madhya Pradesh',
      center: [23.2599, 77.4126],
      zoom: 7,
      districts: [
        { id: 'bastar', name: 'Bastar', center: [19.3158, 82.0464] },
        { id: 'dindori', name: 'Dindori', center: [22.9441, 81.0792] },
        { id: 'mandla', name: 'Mandla', center: [22.5985, 80.3714] },
        { id: 'betul', name: 'Betul', center: [21.9024, 77.8982] },
        { id: 'chhindwara', name: 'Chhindwara', center: [22.0573, 78.9382] },
      ],
    },
    od: {
      name: 'Odisha',
      center: [20.9517, 85.0985],
      zoom: 7,
      districts: [
        { id: 'mayurbhanj', name: 'Mayurbhanj', center: [21.9287, 86.7449] },
        { id: 'keonjhar', name: 'Keonjhar', center: [21.6293, 85.5831] },
        { id: 'sundargarh', name: 'Sundargarh', center: [22.1179, 84.0201] },
        { id: 'koraput', name: 'Koraput', center: [18.8120, 82.7113] },
        { id: 'rayagada', name: 'Rayagada', center: [19.1760, 83.4189] },
      ],
    },
    tg: {
      name: 'Telangana',
      center: [18.1124, 79.0193],
      zoom: 8,
      districts: [
        { id: 'adilabad', name: 'Adilabad', center: [19.6648, 78.5311] },
        { id: 'khammam', name: 'Khammam', center: [17.2473, 80.1514] },
        { id: 'warangal', name: 'Warangal', center: [18.0000, 79.5800] },
        { id: 'karimnagar', name: 'Karimnagar', center: [18.4386, 79.1288] },
        { id: 'nizamabad', name: 'Nizamabad', center: [18.6725, 78.0941] },
      ],
    },
    tr: {
      name: 'Tripura',
      center: [23.9408, 91.9882],
      zoom: 9,
      districts: [
        { id: 'west-tripura', name: 'West Tripura', center: [23.8315, 91.2868] },
        { id: 'south-tripura', name: 'South Tripura', center: [23.1637, 91.4397] },
        { id: 'north-tripura', name: 'North Tripura', center: [24.0756, 92.1735] },
        { id: 'dhalai', name: 'Dhalai', center: [23.8370, 91.8570] },
      ],
    },
  };

  // Sample FRA data by state
  const fraData = {
    mp: {
      totalLand: 68456,
      forestArea: 45678,
      approvedClaims: 4234,
      pendingClaims: 1890,
      rejectedClaims: 400,
      villages: 856,
    },
    od: {
      totalLand: 52341,
      forestArea: 38945,
      approvedClaims: 2654,
      pendingClaims: 1234,
      rejectedClaims: 235,
      villages: 645,
    },
    tg: {
      totalLand: 41287,
      forestArea: 28976,
      approvedClaims: 1876,
      pendingClaims: 1045,
      rejectedClaims: 335,
      villages: 523,
    },
    tr: {
      totalLand: 28934,
      forestArea: 22456,
      approvedClaims: 529,
      pendingClaims: 656,
      rejectedClaims: 759,
      villages: 234,
    },
  };

  // Fetch FRA Atlas records from backend
  useEffect(() => {
    const fetchFraRecords = async () => {
      try {
        const response = await fetch('/api/fra-atlas/records');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.success) {
          // Transform records into map markers
          const recordMarkers = data.records.map((record) => {
            // Generate random coordinates based on state (demo - in production, use actual coordinates)
            const state = statesData[selectedState];
            const lat = state.center[0] + (Math.random() - 0.5) * 1.5;
            const lng = state.center[1] + (Math.random() - 0.5) * 1.5;
            
            return {
              id: record._id,
              position: [lat, lng],
              type: 'fra-record',
              status: record.metadata.status || 'pending_verification',
              title: `FRA Atlas Record: ${record._id}`,
              recordType: record.recordType,
              ocrData: record.ocrData,
              metadata: record.metadata,
              details: {
                documentId: record.metadata.documentId,
                fileName: record.metadata.fileName,
                uploadedBy: record.metadata.uploadedBy,
                submittedAt: new Date(record.metadata.submittedAt).toLocaleString('en-IN'),
                recordType: record.recordType,
                // Extract key info from NER
                persons: record.ocrData?.ner?.persons || [],
                locations: record.ocrData?.ner?.locations || [],
                area: record.ocrData?.extractedText?.match(/(\d+\.?\d*)\s*(acre|hectare|ha)/i)?.[0] || 'N/A',
                landUse: determineLandUse(record.ocrData?.extractedText),
                forestCover: determineForestCover(record.ocrData?.extractedText),
              },
            };
          });
          
          setFraRecords(recordMarkers);
          // eslint-disable-next-line no-console
          console.log(`📍 Loaded ${recordMarkers.length} FRA Atlas records on map`);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching FRA records:', error);
      }
    };
    
    fetchFraRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to determine land use from OCR text
  const determineLandUse = (text) => {
    if (!text) return 'Mixed Use';
    const lowerText = text.toLowerCase();
    if (lowerText.includes('cultivation') || lowerText.includes('agriculture')) return 'Agricultural Land';
    if (lowerText.includes('habitation') || lowerText.includes('residence')) return 'Residential';
    if (lowerText.includes('grazing') || lowerText.includes('pasture')) return 'Grazing Land';
    if (lowerText.includes('forest') || lowerText.includes('bamboo') || lowerText.includes('timber')) return 'Forest Land';
    return 'Mixed Use';
  };

  // Helper function to determine forest cover
  const determineForestCover = (text) => {
    if (!text) return 'Medium (40-70%)';
    const lowerText = text.toLowerCase();
    if (lowerText.includes('dense forest') || lowerText.includes('thick forest')) return 'Dense (>70%)';
    if (lowerText.includes('sparse') || lowerText.includes('open forest')) return 'Sparse (<40%)';
    return 'Medium (40-70%)';
  };

  // Update map center when state/district changes
  useEffect(() => {
    const state = statesData[selectedState];
    if (selectedDistrict === 'all') {
      setMapCenter(state.center);
      setMapZoom(state.zoom);
    } else {
      const district = state.districts.find(d => d.id === selectedDistrict);
      if (district) {
        setMapCenter(district.center);
        setMapZoom(10);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState, selectedDistrict]);

  // Handle layer toggle
  const handleLayerToggle = (layerId) => {
    setMapLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  // Create custom markers for different claim types
  const createCustomIcon = (type, status) => {
    const colors = {
      approved: governmentColors.success,
      pending: governmentColors.warning,
      rejected: governmentColors.error,
      forest: governmentColors.primaryGreen,
      village: governmentColors.saffron,
      water: governmentColors.info,
      'fra-record': governmentColors.saffron,
      'pending_verification': governmentColors.warning,
    };

    const color = colors[status] || governmentColors.primaryBlue;
    
    return new L.DivIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">${type === 'fra-record' ? '📄' : type === 'forest' ? '🌲' : type === 'village' ? '🏠' : type === 'water' ? '💧' : status === 'approved' ? '✓' : status === 'pending' ? '⏳' : '✗'}</div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  // Generate sample markers based on selected state
  const generateSampleMarkers = () => {
    const state = statesData[selectedState];
    const centerLat = state.center[0];
    const centerLng = state.center[1];
    const markers = [];

    // Generate random markers around the center
    for (let i = 0; i < 20; i++) {
      const lat = centerLat + (Math.random() - 0.5) * 2;
      const lng = centerLng + (Math.random() - 0.5) * 2;
      
      const statuses = ['approved', 'pending', 'rejected'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      markers.push({
        id: i,
        position: [lat, lng],
        type: 'claim',
        status,
        title: `${status.toUpperCase()} FRA Claim #${1000 + i}`,
        details: {
          area: Math.floor(Math.random() * 50 + 10),
          claimant: `Beneficiary ${i + 1}`,
          village: `Village ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 100)}`,
          district: state.districts[Math.floor(Math.random() * state.districts.length)]?.name || 'District A',
          submittedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
        },
      });
    }

    // Add forest and village markers
    for (let i = 0; i < 10; i++) {
      const lat = centerLat + (Math.random() - 0.5) * 2;
      const lng = centerLng + (Math.random() - 0.5) * 2;
      
      markers.push({
        id: `forest_${i}`,
        position: [lat, lng],
        type: 'forest',
        status: 'forest',
        title: `Protected Forest Area #${i + 1}`,
        details: {
          area: Math.floor(Math.random() * 200 + 50),
          type: 'Reserved Forest',
          coverage: Math.floor(Math.random() * 20 + 80) + '%',
        },
      });
    }

    return markers;
  };

  const markers = generateSampleMarkers();
  const currentStateData = fraData[selectedState];

  // Map type configurations
  const mapConfigs = [
    {
      name: tFallback('mapView'),
      icon: <MapIcon />,
      tileUrl: '/api/tiles/osm/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors (proxied)',
    },
    {
      name: tFallback('satelliteView'),
      icon: <Satellite />,
      tileUrl: '/api/tiles/esri/{z}/{x}/{y}.jpg',
      attribution: '© Esri World Imagery (proxied)',
    },
    {
      name: tFallback('terrainView'),
      icon: <Terrain />,
      tileUrl: '/api/tiles/opentopo/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap (proxied)',
    },
    {
      name: '3D DETAILED VIEW',
      icon: <Nature />,
      tileUrl: '/api/tiles/google/y/{z}/{x}/{y}.png',
      attribution: '© Google Hybrid (proxied)',
    },
  ];

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${governmentColors.lightBlue} 0%, ${governmentColors.lightGreen} 100%)`,
    }}>
      {/* Header Controls */}
      <Box sx={{ 
        background: 'white',
        borderBottom: `3px solid ${governmentColors.primaryBlue}`,
        p: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${governmentColors.navy} 0%, ${governmentColors.primaryBlue} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 0.5,
                }}
              >
                🗺️ {t('webgisTitle')}
              </Typography>
              <Typography variant="body1" sx={{ color: governmentColors.grey[600] }}>
                {t('mapSubtitle')}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>{t('selectState')}</InputLabel>
                <Select
                  value={selectedState}
                  label={t('selectState')}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict('all');
                  }}
                >
                  {Object.entries(statesData).map(([key, state]) => (
                    <MenuItem key={key} value={key}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>{t('district')}</InputLabel>
                <Select
                  value={selectedDistrict}
                  label={t('district')}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <MenuItem value="all">{t('allStates')}</MenuItem>
                  {statesData[selectedState].districts.map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Tooltip title={t('refreshData')}>
                <IconButton sx={{ bgcolor: governmentColors.lightBlue }}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Map Area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Map Container */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          {/* Map Type Tabs */}
          <Box sx={{ 
            position: 'absolute', 
            top: 16, 
            left: 16, 
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}>
            <Tabs
              value={mapType}
              onChange={(e, newValue) => setMapType(newValue)}
              variant="scrollable"
              scrollButtons="auto"
            >
              {mapConfigs.map((config, index) => (
                <Tab
                  key={index}
                  icon={config.icon}
                  label={config.name}
                  sx={{
                    minWidth: 120,
                    fontWeight: 600,
                    '&.Mui-selected': {
                      color: governmentColors.primaryBlue,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Map Controls */}
          <Box sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}>
            <Tooltip title={t('zoomIn')}>
              <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'white' } }}>
                <ZoomIn />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('zoomOut')}>
              <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'white' } }}>
                <ZoomOut />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('myLocation')}>
              <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'white' } }}>
                <MyLocation />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('fullScreen')}>
              <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'white' } }}>
                <Fullscreen />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Loading Overlay */}
          {mapLoading && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001,
              flexDirection: 'column',
              gap: 2
            }}>
              <Typography variant="h6" sx={{ color: governmentColors.primaryBlue, fontWeight: 600 }}>
                🗺️ Loading Interactive Map...
              </Typography>
              <LinearProgress sx={{ width: 200, height: 6, borderRadius: 3 }} />
            </Box>
          )}
          
          {/* Leaflet Map */}
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            maxZoom={22}
            minZoom={3}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            zoomControl={true}
            whenReady={(map) => {
              setMapLoading(false);
              setTimeout(() => {
                map.target.invalidateSize();
              }, 100);
            }}
          >
            <MapUpdater center={mapCenter} zoom={mapZoom} />
            <TileLayer
              key={`tile-layer-${mapType}`}
              attribution={mapConfigs[mapType].attribution}
              url={mapConfigs[mapType].tileUrl}
              maxZoom={22}
              maxNativeZoom={mapType === 3 ? 22 : 19}
              minZoom={3}
              crossOrigin="anonymous"
              eventHandlers={{
                loading: () => {
                  console.log('🗺️ Tiles loading...');
                },
                load: () => {
                  console.log('✅ Tiles loaded successfully');
                  setMapLoading(false);
                  setMapError(false);
                },
                tileerror: (error) => {
                  console.error('❌ Tile loading error:', error);
                  setMapError(true);
                },
              }}
            />
            
            {/* Render markers based on active layers */}
            {markers
              .filter(marker => {
                if (marker.type === 'claim') return mapLayers.fraApproved || mapLayers.fraPending;
                if (marker.type === 'forest') return mapLayers.forestCover;
                if (marker.type === 'village') return mapLayers.tribalVillages;
                return true;
              })
              .map(marker => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  icon={createCustomIcon(marker.type, marker.status)}
                >
                  <Popup>
                    <Box sx={{ minWidth: 250 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 1 }}>
                        {marker.title}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      {marker.type === 'claim' ? (
                        <Box>
                          <Typography variant="body2"><strong>{t('status')}:</strong> 
                            <Chip 
                              size="small" 
                              label={marker.status.toUpperCase()} 
                              sx={{ 
                                ml: 1,
                                bgcolor: marker.status === 'approved' ? governmentColors.success : 
                                        marker.status === 'pending' ? governmentColors.warning : 
                                        governmentColors.error,
                                color: 'white'
                              }} 
                            />
                          </Typography>
                          <Typography variant="body2"><strong>{t('area')}:</strong> {marker.details.area} {t('hectares')}</Typography>
                          <Typography variant="body2"><strong>{t('claimant')}:</strong> {marker.details.claimant}</Typography>
                          <Typography variant="body2"><strong>{t('village')}:</strong> {marker.details.village}</Typography>
                          <Typography variant="body2"><strong>{t('district')}:</strong> {marker.details.district}</Typography>
                          <Typography variant="body2"><strong>{t('submitted')}:</strong> {marker.details.submittedDate}</Typography>
                        </Box>
                      ) : marker.type === 'forest' ? (
                        <Box>
                          <Typography variant="body2"><strong>{t('area')}:</strong> {marker.details.area} {t('hectares')}</Typography>
                          <Typography variant="body2"><strong>{t('type')}:</strong> {marker.details.type}</Typography>
                          <Typography variant="body2"><strong>{t('coverage')}:</strong> {marker.details.coverage}</Typography>
                        </Box>
                      ) : marker.type === 'fra-record' ? (
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <Chip 
                              size="small" 
                              label={marker.recordType} 
                              sx={{ 
                                bgcolor: governmentColors.saffron,
                                color: 'white',
                                fontWeight: 600
                              }} 
                            />
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}><strong>📄 {t('document')}:</strong> {marker.details.fileName}</Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}><strong>👤 {t('applicants')}:</strong> {marker.details.persons.join(', ') || 'N/A'}</Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}><strong>📍 {t('locations')}:</strong> {marker.details.locations.join(', ') || 'N/A'}</Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}><strong>🏞️ {t('area')}:</strong> {marker.details.area}</Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}><strong>🌾 {t('landUse')}:</strong> {marker.details.landUse}</Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}><strong>🌲 {t('forestCoverLabel')}:</strong> {marker.details.forestCover}</Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}><strong>📅 {t('submittedAt')}:</strong> {marker.details.submittedAt}</Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}><strong>✉️ {t('by')}:</strong> {marker.details.uploadedBy}</Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="caption" color="textSecondary">
                            {t('status')}: {marker.status.replace('_', ' ').toUpperCase()}
                          </Typography>
                        </Box>
                      ) : null}
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="textSecondary">
                          {t('coordinates')}: {marker.position[0].toFixed(4)}, {marker.position[1].toFixed(4)}
                        </Typography>
                      </Box>
                    </Box>
                  </Popup>
                </Marker>
              ))
            }
            
            {/* Render FRA Atlas Records */}
            {mapLayers.fraRecords && fraRecords.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                icon={createCustomIcon(marker.type, marker.status)}
              >
                <Popup maxWidth={350}>
                  <Box sx={{ minWidth: 300 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 1 }}>
                      {marker.title}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <Chip 
                          size="small" 
                          label={marker.recordType} 
                          sx={{ 
                            bgcolor: governmentColors.saffron,
                            color: 'white',
                            fontWeight: 600
                          }} 
                        />
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>📄 {t('document')}:</strong> {marker.details.fileName}</Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>👤 {t('applicants')}:</strong> {marker.details.persons.join(', ') || 'N/A'}</Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>📍 {t('locations')}:</strong> {marker.details.locations.join(', ') || 'N/A'}</Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>🏞️ {t('area')}:</strong> {marker.details.area}</Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>🌾 {t('landUse')}:</strong> {marker.details.landUse}</Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>🌲 {t('forestCoverLabel')}:</strong> {marker.details.forestCover}</Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>📅 {t('submittedAt')}:</strong> {marker.details.submittedAt}</Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}><strong>✉️ {t('by')}:</strong> {marker.details.uploadedBy}</Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="caption" color="textSecondary">
                        {t('status')}: {marker.status.replace('_', ' ').toUpperCase()}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="textSecondary">
                        {t('coordinates')}: {marker.position[0].toFixed(4)}, {marker.position[1].toFixed(4)}
                      </Typography>
                    </Box>
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>

        {/* Right Sidebar - Statistics & Controls */}
        <Box sx={{ 
          width: 380, 
          flexShrink: 0, 
          backgroundColor: 'white',
          borderLeft: `3px solid ${governmentColors.primaryBlue}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          <Box sx={{ p: 3, borderBottom: `1px solid ${governmentColors.grey[300]}` }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 2 }}>
              📊 {statesData[selectedState].name} Statistics
            </Typography>
            
            {/* Key Statistics */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Card sx={{ p: 2, textAlign: 'center', bgcolor: `${governmentColors.primaryGreen}10` }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: governmentColors.primaryGreen }}>
                    {currentStateData.totalLand.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {t('totalLand')}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ p: 2, textAlign: 'center', bgcolor: `${governmentColors.success}10` }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: governmentColors.success }}>
                    {currentStateData.forestArea.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {t('forestAreaHa')}
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            {/* Claims Statistics */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: governmentColors.navy, mb: 2 }}>
                {t('fraClaimsStatus')}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{t('approvedClaims')}</Typography>
                  <Typography variant="body2" sx={{ color: governmentColors.success, fontWeight: 600 }}>
                    {currentStateData.approvedClaims.toLocaleString()}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(currentStateData.approvedClaims / (currentStateData.approvedClaims + currentStateData.pendingClaims + currentStateData.rejectedClaims)) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: `${governmentColors.success}20`,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: governmentColors.success,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{t('pendingClaims')}</Typography>
                  <Typography variant="body2" sx={{ color: governmentColors.warning, fontWeight: 600 }}>
                    {currentStateData.pendingClaims.toLocaleString()}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(currentStateData.pendingClaims / (currentStateData.approvedClaims + currentStateData.pendingClaims + currentStateData.rejectedClaims)) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: `${governmentColors.warning}20`,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: governmentColors.warning,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
              
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{t('rejectedClaims')}</Typography>
                  <Typography variant="body2" sx={{ color: governmentColors.error, fontWeight: 600 }}>
                    {currentStateData.rejectedClaims.toLocaleString()}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(currentStateData.rejectedClaims / (currentStateData.approvedClaims + currentStateData.pendingClaims + currentStateData.rejectedClaims)) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: `${governmentColors.error}20`,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: governmentColors.error,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Chip
                icon={<Home />}
                label={`${currentStateData.villages} ${t('villagesCovered')}`}
                sx={{
                  bgcolor: governmentColors.saffron,
                  color: 'white',
                  fontWeight: 600,
                }}
              />
              <Chip
                label={`${fraRecords.length} ${t('fraRecords')}`}
                sx={{
                  bgcolor: governmentColors.primaryBlue,
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>

          {/* Layer Controls */}
          <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 2 }}>
              🎛️ {t('mapLayers')}
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { id: 'fraRecords', label: t('fraRecords'), icon: <CheckCircle />, color: governmentColors.saffron },
                { id: 'fraApproved', label: t('approvedClaims'), icon: <CheckCircle />, color: governmentColors.success },
                { id: 'fraPending', label: t('pendingClaims'), icon: <PendingActions />, color: governmentColors.warning },
                { id: 'forestCover', label: t('forestCoverLabel'), icon: <Forest />, color: governmentColors.primaryGreen },
                { id: 'tribalVillages', label: t('tribalVillages'), icon: <Home />, color: governmentColors.saffron },
                { id: 'waterBodies', label: t('waterBodies'), icon: <Water />, color: governmentColors.info },
                { id: 'boundaries', label: t('administrativeBoundaries'), icon: <Layers />, color: governmentColors.navy },
              ].map((layer) => (
                <FormControlLabel
                  key={layer.id}
                  control={
                    <Switch
                      checked={mapLayers[layer.id]}
                      onChange={() => handleLayerToggle(layer.id)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: layer.color,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: layer.color,
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ bgcolor: `${layer.color}20`, color: layer.color, width: 32, height: 32 }}>
                        {React.cloneElement(layer.icon, { sx: { fontSize: 18 } })}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: governmentColors.navy }}>
                        {layer.label}
                      </Typography>
                    </Box>
                  }
                  sx={{ m: 0 }}
                />
              ))}
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            {/* Export Options */}
            <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 2 }}>
              📥 {t('exportOptions')}
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                size="small"
                sx={{
                  borderColor: governmentColors.primaryBlue,
                  color: governmentColors.primaryBlue,
                  '&:hover': {
                    bgcolor: `${governmentColors.primaryBlue}10`,
                    borderColor: governmentColors.primaryBlue,
                  },
                }}
              >
                {t('exportMapPDF')}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Share />}
                size="small"
                sx={{
                  borderColor: governmentColors.primaryGreen,
                  color: governmentColors.primaryGreen,
                  '&:hover': {
                    bgcolor: `${governmentColors.primaryGreen}10`,
                    borderColor: governmentColors.primaryGreen,
                  },
                }}
              >
                {t('shareMapView')}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                size="small"
                sx={{
                  borderColor: governmentColors.saffron,
                  color: governmentColors.saffron,
                  '&:hover': {
                    bgcolor: `${governmentColors.saffron}10`,
                    borderColor: governmentColors.saffron,
                  },
                }}
              >
                {t('exportDataCSV')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WebGISMaps;
