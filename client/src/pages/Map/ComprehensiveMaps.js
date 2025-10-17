import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Map as MapIcon,
  Satellite,
  Terrain,
  ZoomIn,
  ZoomOut,
  Fullscreen,
  MyLocation,
  Refresh,
  Download,
  Share,
  Forest,
  Home,
  Nature,
  CheckCircle,
  PendingActions,
  Warning,
  Timeline,
  Assessment,
  ExpandMore
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import '../../styles/leaflet-maps.css';
import TestMap from '../../components/TestMap';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

const ComprehensiveMaps = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedState, setSelectedState] = useState('mp');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapData, setMapData] = useState({});
  const mapRef = useRef();

  // Government colors
  const colors = {
    saffron: '#FF9933',
    white: '#FFFFFF',
    green: '#138808',
    navy: '#000080',
    primaryGreen: '#2E7D32',
    secondaryBlue: '#1565C0',
    accentOrange: '#FF7043',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3'
  };

  // States data with actual coordinates
  const states = [
    { id: 'mp', name: 'Madhya Pradesh', center: [23.2599, 77.4126], zoom: 7 },
    { id: 'od', name: 'Odisha', center: [20.9517, 85.0985], zoom: 7 },
    { id: 'tg', name: 'Telangana', center: [18.1124, 79.0193], zoom: 8 },
    { id: 'tr', name: 'Tripura', center: [23.9408, 91.9882], zoom: 9 }
  ];

  // Layer toggle state
  const [mapLayers, setMapLayers] = useState({
    fraApproved: true,
    fraPending: true,
    forestCover: true,
    tribalSettlements: true,
    satelliteOverlay: false
  });

  // Map statistics
  const [mapStats] = useState({
    totalClaims: 2847,
    approvedClaims: 1293,
    pendingClaims: 425,
    rejectedClaims: 129,
    forestCoverArea: 15680,
    tribalVillages: 342,
    activeOfficers: 45,
    lastUpdated: new Date()
  });

  // Fetch data from backend
  useEffect(() => {
    const fetchMapData = async () => {
      setLoading(true);
      try {
        const [claimsRes, statsRes] = await Promise.all([
          axios.get('/api/fra-claims'),
          axios.get('/api/dashboard/stats')
        ]);
        
        setMapData({
          claims: claimsRes.data,
          stats: statsRes.data
        });
      } catch (err) {
        setError('Failed to load map data');
        console.error('Map data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, [selectedState]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLayerToggle = (layerId) => {
    setMapLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  // Custom map icons for different claim types
  const createCustomIcon = (color, type) => {
    return new L.DivIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">${type}</div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  // Map component with actual Leaflet implementation
  const InteractiveMap = ({ mapType = 'normal' }) => {
    const currentState = states.find(s => s.id === selectedState);
    const center = currentState?.center || [20.5937, 78.9629];
    const zoom = currentState?.zoom || 6;
    
    // Sample data points for demonstration
    const sampleClaims = [
      { id: 1, lat: center[0] + 0.1, lng: center[1] + 0.1, type: 'A', status: 'approved', title: 'IFR Claim #1234' },
      { id: 2, lat: center[0] - 0.1, lng: center[1] - 0.1, type: 'P', status: 'pending', title: 'CFR Claim #5678' },
      { id: 3, lat: center[0] + 0.05, lng: center[1] - 0.15, type: 'R', status: 'rejected', title: 'CR Claim #9012' }
    ];

    const getTileLayer = () => {
      switch (mapType) {
        case 'satellite':
          return {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          };
        case 'terrain':
          return {
            url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          };
        case 'detailed':
          return {
            url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
            attribution: '&copy; Google Maps - Hybrid Satellite View with Labels'
          };
        default:
          return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          };
      }
    };

    const tileLayer = getTileLayer();

    try {
      return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
          <MapContainer
            key={`${selectedState}-${mapType}`} // Force re-render when state or type changes
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%', borderRadius: '12px', zIndex: 1 }}
            scrollWheelZoom={true}
            zoomControl={true}
            attributionControl={true}
          >
            <TileLayer
              attribution={tileLayer.attribution}
              url={tileLayer.url}
            />
            
            {/* Render claim markers */}
            {sampleClaims.map(claim => (
              <Marker
                key={claim.id}
                position={[claim.lat, claim.lng]}
              >
                <Popup>
                  <div>
                    <strong>{claim.title}</strong><br/>
                    Status: <span style={{ color: claim.status === 'approved' ? colors.success : claim.status === 'pending' ? colors.warning : colors.error }}>
                      {claim.status}
                    </span><br/>
                    Location: {claim.lat.toFixed(4)}, {claim.lng.toFixed(4)}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Map Type Indicator */}
          <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 1000,
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
          }}>
            {mapType.toUpperCase()} MAP
          </div>
        </div>
      );
    } catch (error) {
      console.error('Map rendering error:', error);
      return (
        <div style={{ 
          height: '100%', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          border: '2px dashed #ccc',
          borderRadius: '12px'
        }}>
          <div style={{ textAlign: 'center', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🗺️</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Map Loading...</div>
            <div style={{ fontSize: '14px' }}>Please wait while the map initializes</div>
          </div>
        </div>
      );
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  // Atlas Map Component - Interactive OpenStreetMap
  const AtlasMap = () => (
    <Box sx={{ display: 'flex', height: '100%', gap: 1 }}>
      <Box sx={{ flex: 1, p: 1 }}>
        <Card elevation={0} sx={{ height: '100%', borderRadius: 4, overflow: 'hidden' }}>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <CircularProgress size={60} sx={{ color: colors.primaryGreen }} />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
          ) : (
            <TestMap height="100%" />
          )}
        </Card>
      </Box>
      
      {/* Control Panel */}
      <Box sx={{ width: 320, flexShrink: 0, p: 1 }}>
        <Card elevation={0} sx={{ p: 3, height: '100%', borderRadius: 4, overflow: 'auto' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>
            🎛️ Atlas Controls
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select State</InputLabel>
            <Select value={selectedState} onChange={handleStateChange} label="Select State">
              {states.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.navy, mb: 2 }}>
            Layer Controls
          </Typography>
          
          {Object.entries(mapLayers).map(([layerId, enabled]) => (
            <Box key={layerId} sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={enabled}
                    onChange={() => handleLayerToggle(layerId)}
                    size="small"
                  />
                }
                label={layerId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                sx={{ color: colors.navy }}
              />
            </Box>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              size="small"
              sx={{ borderColor: colors.primaryGreen, color: colors.primaryGreen }}
            >
              Export Map
            </Button>
            <Button
              variant="outlined"
              startIcon={<Share />}
              size="small"
              sx={{ borderColor: colors.secondaryBlue, color: colors.secondaryBlue }}
            >
              Share View
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );

  // Satellite Analysis Component - Satellite Imagery
  const SatelliteAnalysis = () => (
    <Box sx={{ display: 'flex', height: '100%', gap: 1 }}>
      <Box sx={{ flex: 1, p: 1 }}>
        <Card elevation={0} sx={{ height: '100%', borderRadius: 4, overflow: 'hidden' }}>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <CircularProgress size={60} sx={{ color: colors.secondaryBlue }} />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
          ) : (
            <InteractiveMap mapType="satellite" />
          )}
        </Card>
      </Box>
      
      <Box sx={{ width: 320, flexShrink: 0, p: 1 }}>
        <Card elevation={0} sx={{ p: 3, height: '100%', borderRadius: 4, overflow: 'auto' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>
            🛰️ Satellite Controls
          </Typography>

          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.navy, mb: 2 }}>
            Data Sources
          </Typography>
          
          {[
            { name: 'LANDSAT 8/9', active: true },
            { name: 'Sentinel-2', active: true },
            { name: 'MODIS Terra', active: false },
            { name: 'Cartosat-3', active: true }
          ].map((source, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <FormControlLabel
                control={<Switch checked={source.active} size="small" />}
                label={source.name}
                sx={{ color: colors.navy }}
              />
            </Box>
          ))}
        </Card>
      </Box>
    </Box>
  );

  // FRA Claims Component - Terrain Map
  const FRAClaims = () => (
    <Box sx={{ display: 'flex', height: '100%', gap: 1 }}>
      <Box sx={{ flex: 1, p: 1 }}>
        <Card elevation={0} sx={{ height: '100%', borderRadius: 4, overflow: 'hidden' }}>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <CircularProgress size={60} sx={{ color: colors.success }} />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
          ) : (
            <InteractiveMap mapType="terrain" />
          )}
        </Card>
      </Box>
      
      <Box sx={{ width: 320, flexShrink: 0, p: 1 }}>
        <Card elevation={0} sx={{ p: 3, height: '100%', borderRadius: 4, overflow: 'auto' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>
            📋 Claims Analysis
          </Typography>

          {[
            { type: 'Individual Forest Rights (IFR)', approved: 1456, pending: 234, rejected: 67 },
            { type: 'Community Forest Rights (CFR)', approved: 892, pending: 123, rejected: 45 },
            { type: 'Community Rights (CR)', approved: 567, pending: 89, rejected: 23 }
          ].map((claim, index) => (
            <Box key={index} sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: `${colors.success}10` }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: colors.navy, mb: 2 }}>
                {claim.type}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={`${claim.approved} ✓`} size="small" sx={{ bgcolor: colors.success, color: 'white' }} />
                <Chip label={`${claim.pending} ⏳`} size="small" sx={{ bgcolor: colors.warning, color: 'white' }} />
                <Chip label={`${claim.rejected} ✗`} size="small" sx={{ bgcolor: colors.error, color: 'white' }} />
              </Box>
            </Box>
          ))}
        </Card>
      </Box>
    </Box>
  );

  // Detailed 3D Satellite View Component - High-Resolution Google Maps
  const DetailedSatelliteView = () => (
    <Box sx={{ display: 'flex', height: '100%', gap: 1 }}>
      <Box sx={{ flex: 1, p: 1 }}>
        <Card elevation={0} sx={{ height: '100%', borderRadius: 4, overflow: 'hidden' }}>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <CircularProgress size={60} sx={{ color: colors.info }} />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
          ) : (
            <InteractiveMap mapType="detailed" />
          )}
        </Card>
      </Box>
      
      <Box sx={{ width: 320, flexShrink: 0, p: 1 }}>
        <Card elevation={0} sx={{ p: 3, height: '100%', borderRadius: 4, overflow: 'auto' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>
            🏞️ Detailed View Features
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="caption">
              High-resolution satellite imagery showing buildings, trees, ponds, lakes, and terrain details
            </Typography>
          </Alert>

          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.navy, mb: 2 }}>
            Visible Features:
          </Typography>
          
          {[
            { icon: '🏠', label: 'Buildings & Structures', color: colors.info },
            { icon: '🌳', label: 'Trees & Vegetation', color: colors.primaryGreen },
            { icon: '💧', label: 'Ponds & Water Bodies', color: colors.secondaryBlue },
            { icon: '🛣️', label: 'Roads & Pathways', color: colors.navy },
            { icon: '🌾', label: 'Agricultural Fields', color: colors.warning },
            { icon: '🏔️', label: 'Terrain & Elevation', color: colors.saffron }
          ].map((feature, index) => (
            <Box key={index} sx={{ 
              mb: 2, 
              p: 2, 
              borderRadius: 2, 
              bgcolor: `${feature.color}10`,
              border: `1px solid ${feature.color}30`,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}>
              <Typography variant="h6">{feature.icon}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: colors.navy }}>
                {feature.label}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography variant="caption" sx={{ color: colors.navy, display: 'block', mb: 1 }}>
            💡 Tip: Zoom in (15x-22x) to see incredible detail including individual buildings, small ponds, and vegetation
          </Typography>
        </Card>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: '#f5f5f5',
      margin: 0,
      padding: 0
    }}>
      {/* Header */}
      <Box sx={{ 
        background: `linear-gradient(135deg, ${colors.saffron} 0%, ${colors.secondaryBlue} 100%)`,
        color: colors.white,
        p: { xs: 2, md: 3 },
        borderBottom: `4px solid ${colors.green}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: colors.white, color: colors.primaryGreen, width: 56, height: 56, boxShadow: 3 }}>
                <MapIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: colors.white, mb: 0.5 }}>
                  Comprehensive WebGIS Platform
                </Typography>
                <Typography variant="body1" sx={{ color: colors.white, opacity: 0.9, fontSize: '1.1rem' }}>
                  AI-Powered Forest Rights Atlas & Satellite Analysis
                </Typography>
              </Box>
            </Box>
            
            {/* Quick Stats */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: colors.white }}>
                  {mapStats.totalClaims.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.white, opacity: 0.8 }}>
                  Total Claims
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: colors.white }}>
                  {mapStats.forestCoverArea.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.white, opacity: 0.8 }}>
                  Ha Protected
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: colors.white }}>
                  {mapStats.tribalVillages}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.white, opacity: 0.8 }}>
                  Villages
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* Main Content - Accordion Based Full Screen Maps */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Atlas Maps Accordion */}
          <Accordion 
            expanded={activeTab === 0} 
            onChange={(e, expanded) => expanded && setActiveTab(0)}
            sx={{ 
              mb: 2, 
              borderRadius: 3, 
              border: `2px solid ${colors.primaryGreen}30`,
              boxShadow: 3,
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore />} 
              sx={{ 
                bgcolor: `${colors.primaryGreen}10`,
                borderRadius: '12px 12px 0 0',
                minHeight: 80,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 2
                }
              }}
            >
              <Avatar sx={{ bgcolor: colors.primaryGreen, width: 48, height: 48 }}>
                <MapIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: colors.navy }}>
                  Interactive Atlas Maps
                </Typography>
                <Typography variant="body2" sx={{ color: colors.navy, opacity: 0.7 }}>
                  Explore detailed FRA claims visualization with multiple layer support
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Box sx={{ height: 'calc(100vh - 280px)', position: 'relative' }}>
                <AtlasMap />
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Satellite Analysis Accordion */}
          <Accordion 
            expanded={activeTab === 1} 
            onChange={(e, expanded) => expanded && setActiveTab(1)}
            sx={{ 
              mb: 2, 
              borderRadius: 3, 
              border: `2px solid ${colors.secondaryBlue}30`,
              boxShadow: 3,
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore />} 
              sx={{ 
                bgcolor: `${colors.secondaryBlue}10`,
                borderRadius: '12px 12px 0 0',
                minHeight: 80,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 2
                }
              }}
            >
              <Avatar sx={{ bgcolor: colors.secondaryBlue, width: 48, height: 48 }}>
                <Satellite sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: colors.navy }}>
                  Satellite Data Analysis
                </Typography>
                <Typography variant="body2" sx={{ color: colors.navy, opacity: 0.7 }}>
                  Real-time satellite imagery analysis and forest cover monitoring
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Box sx={{ height: 'calc(100vh - 280px)', position: 'relative' }}>
                <SatelliteAnalysis />
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* FRA Claims Accordion */}
          <Accordion 
            expanded={activeTab === 2} 
            onChange={(e, expanded) => expanded && setActiveTab(2)}
            sx={{ 
              mb: 2,
              borderRadius: 3, 
              border: `2px solid ${colors.saffron}30`,
              boxShadow: 3,
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore />} 
              sx={{ 
                bgcolor: `${colors.saffron}10`,
                borderRadius: '12px 12px 0 0',
                minHeight: 80,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 2
                }
              }}
            >
              <Avatar sx={{ bgcolor: colors.saffron, width: 48, height: 48 }}>
                <Assessment sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: colors.navy }}>
                  FRA Claims Management
                </Typography>
                <Typography variant="body2" sx={{ color: colors.navy, opacity: 0.7 }}>
                  Comprehensive claim tracking, status monitoring and analytics
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Box sx={{ height: 'calc(100vh - 280px)', position: 'relative' }}>
                <FRAClaims />
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Detailed 3D Satellite View Accordion */}
          <Accordion 
            expanded={activeTab === 3} 
            onChange={(e, expanded) => expanded && setActiveTab(3)}
            sx={{ 
              borderRadius: 3, 
              border: `2px solid ${colors.info}30`,
              boxShadow: 3,
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore />} 
              sx={{ 
                bgcolor: `${colors.info}10`,
                borderRadius: '12px 12px 0 0',
                minHeight: 80,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 2
                }
              }}
            >
              <Avatar sx={{ bgcolor: colors.info, width: 48, height: 48 }}>
                <Nature sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: colors.navy }}>
                  🏞️ 3D Detailed Satellite View
                </Typography>
                <Typography variant="body2" sx={{ color: colors.navy, opacity: 0.7 }}>
                  High-resolution imagery showing buildings, trees, ponds, lakes & terrain
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Box sx={{ height: 'calc(100vh - 280px)', position: 'relative' }}>
                <DetailedSatelliteView />
              </Box>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ComprehensiveMaps;