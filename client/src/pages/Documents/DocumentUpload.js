import React, { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Alert,
  AlertTitle,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Drawer,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import {
  CloudUpload,
  Description,
  CheckCircle,
  Error,
  Warning,
  Visibility,
  Delete,
  Download,
  Refresh,
  Search,
  FilterList,
  ExpandMore,
  DocumentScanner,
  Verified,
  Schedule,
  Assignment,
  LocationOn,
  Group,
  Nature,
  AccountBalance,
  Business,
  Home,
  School,
  Edit,
  Save,
  Cancel,
  CloudDone,
  ErrorOutline,
  InfoOutlined,
  Map,
  People,
  Gavel,
  Timeline,
  Assessment as AnalyticsIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { DataContext } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DocumentUpload() {
  const { token } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [claimId, setClaimId] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [historicalDocs, setHistoricalDocs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterState, setFilterState] = useState('');
  const [previewDialog, setPreviewDialog] = useState({ open: false, document: null });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documentCategories, setDocumentCategories] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [ocrResults, setOcrResults] = useState({});
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [editingDocument, setEditingDocument] = useState(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [extractedDataView, setExtractedDataView] = useState('structured'); // 'structured' or 'raw'
  
  // Load document types and categories on component mount
  useEffect(() => {
    loadDocumentTypes();
    loadHistoricalDocuments();
    loadDocumentCategories();
  }, []);
  
  const loadDocumentTypes = async () => {
    try {
      const response = await fetch('/api/documents/meta/types', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setDocumentTypes(data.supportedTypes || []);
    } catch (error) {
      console.error('Failed to load document types:', error);
    }
  };
  
  const loadHistoricalDocuments = async () => {
    try {
      const response = await fetch(`/api/documents/historical?page=1&limit=${rowsPerPage}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setHistoricalDocs(data.documents || []);
    } catch (error) {
      console.error('Failed to load historical documents:', error);
    }
  };
  
  const loadDocumentCategories = async () => {
    try {
      const response = await fetch('/api/documents/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setDocumentCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to load document categories:', error);
    }
  };
  
  const onDrop = useCallback(async (acceptedFiles) => {
    if (!selectedDocumentType) {
      alert('Please select a document type first');
      return;
    }
    
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: selectedDocumentType,
      status: 'uploading',
      progress: 0
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Process each file
    for (const fileInfo of newFiles) {
      await uploadFile(fileInfo);
    }
  }, [selectedDocumentType, token]);
  
  const uploadFile = async (fileInfo) => {
    const formData = new FormData();
    formData.append('document', fileInfo.file);
    formData.append('documentType', fileInfo.type);
    formData.append('claimId', claimId);
    formData.append('metadata', JSON.stringify({
      uploadedBy: 'current_user',
      uploadedAt: new Date().toISOString()
    }));
    
    try {
      setUploadProgress(prev => ({ ...prev, [fileInfo.id]: 0 }));
      
      // Simulate progressive upload and processing
      const progressSteps = [10, 30, 60, 80, 90, 100];
      for (let i = 0; i < progressSteps.length - 1; i++) {
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, [fileInfo.id]: progressSteps[i] }));
          setUploadedFiles(prev => prev.map(file => {
            if (file.id === fileInfo.id) {
              const statusMap = {
                0: 'uploading',
                1: 'processing', 
                2: 'extracting',
                3: 'validating',
                4: 'finalizing'
              };
              return { ...file, status: statusMap[i] || 'uploading' };
            }
            return file;
          }));
        }, i * 500);
      }
      
      setTimeout(async () => {
        const response = await fetch('/api/documents/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        
        const result = await response.json();
        
        setUploadedFiles(prev => prev.map(file => {
          if (file.id === fileInfo.id) {
            return {
              ...file,
              status: result.status === 'processed' ? 'completed' : 'needs_review',
              documentId: result.documentId,
              ocrResult: result.processing,
              validation: result.validation,
              progress: 100,
              uploadedAt: new Date().toISOString(),
              dataQuality: result.validation?.dataQuality
            };
          }
          return file;
        }));
        
        setUploadProgress(prev => ({ ...prev, [fileInfo.id]: 100 }));
        
        // Store OCR results
        if (result.processing) {
          setOcrResults(prev => ({ ...prev, [fileInfo.id]: result.processing }));
        }
      }, 2500);
      
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileInfo.id) {
          return { ...file, status: 'error', error: error.message };
        }
        return file;
      }));
    }
  };
  
  // Handle document detail view
  const handleDocumentDetail = (document) => {
    setSelectedDocument(document);
    setDetailDrawerOpen(true);
  };
  
  // Handle document approval
  const handleDocumentApproval = async (documentId, action, comments = '') => {
    try {
      const response = await fetch(`/api/documents/${documentId}/verify`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, comments })
      });
      
      if (response.ok) {
        setUploadedFiles(prev => prev.map(file => {
          if (file.documentId === documentId) {
            return {
              ...file,
              status: action === 'approve' ? 'verified' : action === 'reject' ? 'rejected' : 'correction_required',
              verificationComments: comments,
              verifiedAt: new Date().toISOString()
            };
          }
          return file;
        }));
      }
    } catch (error) {
      console.error('Document verification failed:', error);
    }
  };
  
  // Handle document field editing
  const handleFieldEdit = (documentId, field, newValue) => {
    setUploadedFiles(prev => prev.map(file => {
      if (file.id === documentId) {
        const updatedOcrResult = {
          ...file.ocrResult,
          extractedFields: {
            ...file.ocrResult.extractedFields,
            [field]: newValue
          }
        };
        return {
          ...file,
          ocrResult: updatedOcrResult,
          isEdited: true
        };
      }
      return file;
    }));
  };
  
  // Export document data
  const handleExportDocument = (document, format = 'json') => {
    const exportData = {
      documentInfo: {
        name: document.name,
        type: document.type,
        uploadedAt: document.uploadedAt,
        status: document.status
      },
      extractedData: document.ocrResult?.extractedFields || {},
      processingMetadata: document.ocrResult?.processingMetadata || {},
      validation: document.validation || {}
    };
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${document.name.replace(/\.[^/.]+$/, '')}_extracted_data.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const flatData = [];
      Object.entries(exportData.extractedData).forEach(([key, value]) => {
        flatData.push({ Field: key, Value: formatFieldValue(key, value) });
      });
      
      const csvContent = 'data:text/csv;charset=utf-8,' + 
        'Field,Value\n' + 
        flatData.map(row => `"${row.Field}","${row.Value}"`).join('\n');
      
      const encodedUri = encodeURI(csvContent);
      const a = document.createElement('a');
      a.href = encodedUri;
      a.download = `${document.name.replace(/\.[^/.]+$/, '')}_extracted_data.csv`;
      a.click();
    }
  };
  
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/tiff': ['.tiff', '.tif']
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
    noClick: true
  });
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'needs_review': return <Warning color="warning" />;
      case 'error': return <Error color="error" />;
      case 'uploading': return <Schedule color="info" />;
      default: return <Description />;
    }
  };
  
  const getDocumentTypeIcon = (type) => {
    const icons = {
      'fra-application': <Gavel />,
      'identity-proof': <Assignment />,
      'land-documents': <LocationOn />,
      'tribal-certificate': <Verified />,
      'residence-proof': <Home />,
      'bank-details': <AccountBalance />,
      'community-rights': <Group />,
      'forest-records': <Nature />,
      'historical-records': <School />
    };
    return icons[type] || <Description />;
  };
  
  // Enhanced document processing steps
  const getProcessingSteps = () => [
    { label: 'Upload', icon: <CloudUpload /> },
    { label: 'OCR Processing', icon: <DocumentScanner /> },
    { label: 'Data Extraction', icon: <AnalyticsIcon /> },
    { label: 'Validation', icon: <CheckCircle /> },
    { label: 'Verification', icon: <Verified /> }
  ];
  
  // Get current step based on document status
  const getCurrentStep = (status) => {
    switch (status) {
      case 'uploading': return 0;
      case 'processing': return 1;
      case 'extracting': return 2;
      case 'validating': return 3;
      case 'completed': case 'verified': return 4;
      case 'needs_review': return 3;
      case 'error': return -1;
      default: return 0;
    }
  };
  
  // Organize extracted fields by category for better display
  const organizeExtractedData = (extractedFields, documentType) => {
    if (!extractedFields) return {};
    
    const categories = {
      'Basic Information': ['applicantName', 'fatherName', 'aadharNumber', 'contactNumber', 'dateOfBirth'],
      'Location Details': ['state', 'district', 'block', 'village', 'coordinates', 'address'],
      'Land Information': ['surveyNumbers', 'landArea', 'landClassification', 'forestType', 'boundaries', 'occupiedSince'],
      'Rights & Claims': ['claimType', 'applicationNumber', 'applicationDate', 'certificateNumber', 'issuingAuthority'],
      'Tribal Information': ['tribalCommunity', 'category', 'validUpto'],
      'Financial Details': ['accountNumber', 'ifscCode', 'bankName', 'branchName'],
      'Community Details': ['gramSabhaResolution', 'beneficiaryFamilies', 'forestAreaClaimed', 'traditionalUses'],
      'Assets & Infrastructure': ['cropsGrown', 'livestockCount', 'forestProduceCollection', 'infrastructureNeeds', 'existingStructures'],
      'Scheme Integration': ['pmKisanEligibility', 'mgnregaCardNumber', 'jalJeevanMissionStatus', 'dajguaSchemesApplicable'],
      'Historical Data': ['recordYear', 'settlementOfficer', 'recordedRights', 'historicalFamilies', 'historicalArea'],
      'Status Information': ['currentStatus', 'verificationStatus', 'issueDate', 'residentSince']
    };
    
    const organized = {};
    Object.entries(categories).forEach(([category, fields]) => {
      const categoryData = {};
      fields.forEach(field => {
        if (extractedFields[field] !== undefined) {
          categoryData[field] = extractedFields[field];
        }
      });
      if (Object.keys(categoryData).length > 0) {
        organized[category] = categoryData;
      }
    });
    
    // Add any remaining fields to 'Other Information'
    const allCategorizedFields = Object.values(categories).flat();
    const otherFields = {};
    Object.entries(extractedFields).forEach(([key, value]) => {
      if (!allCategorizedFields.includes(key)) {
        otherFields[key] = value;
      }
    });
    if (Object.keys(otherFields).length > 0) {
      organized['Other Information'] = otherFields;
    }
    
    return organized;
  };
  
  // Format field value for display
  const formatFieldValue = (key, value) => {
    if (value === null || value === undefined) return 'Not available';
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') {
      if (key === 'coordinates') {
        return `${value.latitude || 'N/A'}°N, ${value.longitude || 'N/A'}°E`;
      }
      if (key === 'boundaries') {
        return `N: ${value.north || 'N/A'}, S: ${value.south || 'N/A'}, E: ${value.east || 'N/A'}, W: ${value.west || 'N/A'}`;
      }
      return JSON.stringify(value, null, 2);
    }
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (key.includes('Date') || key.includes('Since') || key === 'validUpto') {
      return new Date(value).toLocaleDateString();
    }
    return String(value);
  };
  
  // Get field display name
  const getFieldDisplayName = (key) => {
    const displayNames = {
      applicantName: 'Applicant Name',
      fatherName: 'Father\'s Name',
      aadharNumber: 'Aadhar Number',
      contactNumber: 'Contact Number',
      dateOfBirth: 'Date of Birth',
      tribalCommunity: 'Tribal Community',
      claimType: 'Claim Type',
      landArea: 'Land Area (Ha)',
      surveyNumbers: 'Survey Numbers',
      landClassification: 'Land Classification',
      forestType: 'Forest Type',
      applicationNumber: 'Application Number',
      applicationDate: 'Application Date',
      certificateNumber: 'Certificate Number',
      issuingAuthority: 'Issuing Authority',
      accountNumber: 'Account Number',
      ifscCode: 'IFSC Code',
      bankName: 'Bank Name',
      branchName: 'Branch Name',
      gramSabhaResolution: 'Gram Sabha Resolution',
      beneficiaryFamilies: 'Beneficiary Families',
      forestAreaClaimed: 'Forest Area Claimed (Ha)',
      traditionalUses: 'Traditional Uses',
      cropsGrown: 'Crops Grown',
      livestockCount: 'Livestock Count',
      forestProduceCollection: 'Forest Produce Collection',
      infrastructureNeeds: 'Infrastructure Needs',
      pmKisanEligibility: 'PM-KISAN Eligibility',
      mgnregaCardNumber: 'MGNREGA Card Number',
      jalJeevanMissionStatus: 'Jal Jeevan Mission Status',
      dajguaSchemesApplicable: 'DAJGUA Schemes Applicable'
    };
    return displayNames[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };
  
  const handleSearchHistorical = async () => {
    try {
      let url = '/api/documents/historical?';
      const params = new URLSearchParams();
      
      if (searchQuery) params.append('search', searchQuery);
      if (filterCategory) params.append('category', filterCategory);
      if (filterState) params.append('state', filterState);
      params.append('page', page + 1);
      params.append('limit', rowsPerPage);
      
      const response = await fetch(url + params.toString(), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      setHistoricalDocs(data.documents || []);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
  
  const handlePreview = (document) => {
    setPreviewDialog({ open: true, document });
  };
  
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)', color: 'white' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          📄 Document Management System
        </Typography>
        <Typography variant="subtitle1">
          Upload, process, and manage FRA documents with AI-powered OCR and validation
        </Typography>
      </Paper>
      
      {/* Tabs Navigation */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange} variant="fullWidth">
          <Tab
            label={
              <Badge badgeContent={uploadedFiles.length} color="primary">
                Document Upload
              </Badge>
            }
            icon={<CloudUpload />}
          />
          <Tab
            label={
              <Badge badgeContent={historicalDocs.length} color="secondary">
                Historical Records
              </Badge>
            }
            icon={<DocumentScanner />}
          />
          <Tab
            label="Document Categories"
            icon={<FilterList />}
          />
        </Tabs>
      </Paper>
      
      {/* Tab Panels */}
      <TabPanel value={currentTab} index={0}>
        {/* Document Upload Tab */}
        <Grid container spacing={3}>
          {/* Upload Controls */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upload Configuration
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Document Type</InputLabel>
                  <Select
                    value={selectedDocumentType}
                    onChange={(e) => setSelectedDocumentType(e.target.value)}
                    required
                  >
                    {documentTypes.map((type) => (
                      <MenuItem key={type.type} value={type.type}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getDocumentTypeIcon(type.type)}
                          {type.displayName}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  label="Claim ID (Optional)"
                  value={claimId}
                  onChange={(e) => setClaimId(e.target.value)}
                  sx={{ mb: 2 }}
                  helperText="Link documents to specific claim"
                />
                
                {selectedDocumentType && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <AlertTitle>Document Requirements</AlertTitle>
                    {documentTypes.find(t => t.type === selectedDocumentType)?.description}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          {/* Drop Zone */}
          <Grid item xs={12} md={8}>
            <Paper
              {...getRootProps({ onClick: open })}
              sx={{
                border: '2px dashed #ccc',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.3s',
                '&:hover': {
                  borderColor: '#2E7D32'
                },
                ...(isDragActive && {
                  borderColor: '#2E7D32',
                  backgroundColor: '#f1f8e9'
                })
              }}
            >
              <input {...getInputProps()} />
              <CloudUpload sx={{ fontSize: 64, color: '#2E7D32', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                {isDragActive ? 'Drop files here...' : 'Drag & drop files here'}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                or click to select files
              </Typography>
              <Button variant="contained" size="small" onClick={open} sx={{ mt: 1 }}>
                Browse files
              </Button>
              <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                Supported formats: PDF, JPEG, PNG, TIFF • Max size: 10MB per file
              </Typography>
            </Paper>
          </Grid>
          
          {/* Enhanced Document Cards Display */}
          {uploadedFiles.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 2, fontWeight: 600, color: 'primary.main' }}>
                📋 Digitized Documents ({uploadedFiles.length})
              </Typography>
              
              <Grid container spacing={3}>
                {uploadedFiles.map((file) => {
                  const organizedData = organizeExtractedData(file.ocrResult?.extractedFields, file.type);
                  const currentStep = getCurrentStep(file.status);
                  
                  return (
                    <Grid item xs={12} md={6} lg={4} key={file.id}>
                      <Card 
                        elevation={3} 
                        sx={{
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 6
                          },
                          border: file.isEdited ? '2px solid #FF9800' : 'none',
                          position: 'relative'
                        }}
                      >
                        {/* Status Badge */}
                        <Box sx={{ 
                          position: 'absolute', 
                          top: 8, 
                          right: 8, 
                          zIndex: 1
                        }}>
                          <Chip 
                            icon={getStatusIcon(file.status)}
                            label={file.status.replace('_', ' ').toUpperCase()}
                            size="small"
                            color={{
                              'completed': 'success',
                              'verified': 'success',
                              'needs_review': 'warning',
                              'error': 'error',
                              'uploading': 'info',
                              'processing': 'info',
                              'extracting': 'info'
                            }[file.status] || 'default'}
                            variant={file.status === 'completed' || file.status === 'verified' ? 'filled' : 'outlined'}
                          />
                        </Box>
                        
                        <CardContent sx={{ pb: 1 }}>
                          {/* Document Header */}
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ 
                              bgcolor: 'primary.main', 
                              mr: 2,
                              width: 48,
                              height: 48
                            }}>
                              {getDocumentTypeIcon(file.type)}
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                                {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                              </Typography>
                              <Chip 
                                label={file.type.replace('-', ' ').toUpperCase()}
                                size="small"
                                variant="outlined"
                                color="primary"
                              />
                            </Box>
                          </Box>
                          
                          {/* Processing Progress */}
                          {(file.status === 'uploading' || file.status === 'processing' || file.status === 'extracting') && (
                            <Box sx={{ mb: 2 }}>
                              <Stepper activeStep={currentStep} alternativeLabel size="small">
                                {getProcessingSteps().slice(0, 3).map((step, index) => (
                                  <Step key={index}>
                                    <StepLabel 
                                      StepIconComponent={() => 
                                        <Box sx={{ 
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          width: 24,
                                          height: 24,
                                          borderRadius: '50%',
                                          bgcolor: index <= currentStep ? 'primary.main' : 'grey.300',
                                          color: 'white'
                                        }}>
                                          {React.cloneElement(step.icon, { sx: { fontSize: 14 } })}
                                        </Box>
                                      }
                                    >
                                      <Typography variant="caption">{step.label}</Typography>
                                    </StepLabel>
                                  </Step>
                                ))}
                              </Stepper>
                              <LinearProgress 
                                variant="determinate" 
                                value={uploadProgress[file.id] || 0}
                                sx={{ mt: 1, height: 6, borderRadius: 3 }}
                              />
                            </Box>
                          )}
                          
                          {/* Document Metrics */}
                          <Grid container spacing={1} sx={{ mb: 2 }}>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                                <Typography variant="h6" color="primary" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                  {(file.size / 1024 / 1024).toFixed(1)}MB
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  Size
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                                <Typography variant="h6" color="success.main" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                  {file.ocrResult ? `${(file.ocrResult.confidence * 100).toFixed(0)}%` : 'N/A'}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  Confidence
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                                <Typography variant="h6" color="info.main" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                  {Object.keys(organizedData).length}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  Categories
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          
                          {/* Key Extracted Information Preview */}
                          {file.ocrResult?.extractedFields && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                                📊 Key Information:
                              </Typography>
                              <Stack spacing={0.5}>
                                {Object.entries(organizedData).slice(0, 2).map(([category, fields]) => (
                                  <Box key={category}>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                      {category}:
                                    </Typography>
                                    <Box sx={{ ml: 1 }}>
                                      {Object.entries(fields).slice(0, 2).map(([key, value]) => (
                                        <Typography key={key} variant="caption" display="block" color="textSecondary">
                                          • {getFieldDisplayName(key)}: {formatFieldValue(key, value).substring(0, 30)}
                                          {formatFieldValue(key, value).length > 30 ? '...' : ''}
                                        </Typography>
                                      ))}
                                    </Box>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          )}
                          
                          {/* Data Quality Indicators */}
                          {file.dataQuality && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" gutterBottom display="block" sx={{ fontWeight: 600 }}>
                                Data Quality Metrics:
                              </Typography>
                              <Grid container spacing={1}>
                                <Grid item xs={4}>
                                  <Typography variant="caption" color="textSecondary">Completeness</Typography>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={file.dataQuality.completeness}
                                    size="small"
                                    sx={{ height: 4, borderRadius: 2 }}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography variant="caption" color="textSecondary">Accuracy</Typography>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={file.dataQuality.accuracy}
                                    color="success"
                                    sx={{ height: 4, borderRadius: 2 }}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography variant="caption" color="textSecondary">Consistency</Typography>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={file.dataQuality.consistency}
                                    color="info"
                                    sx={{ height: 4, borderRadius: 2 }}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          )}
                          
                          {/* Validation Warnings */}
                          {file.validation?.warnings && file.validation.warnings.length > 0 && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                              <Typography variant="caption">
                                {file.validation.warnings[0]}
                                {file.validation.warnings.length > 1 && ` (+${file.validation.warnings.length - 1} more)`}
                              </Typography>
                            </Alert>
                          )}
                        </CardContent>
                        
                        {/* Card Actions */}
                        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="View Details">
                              <IconButton 
                                size="small" 
                                onClick={() => handleDocumentDetail(file)}
                                sx={{ color: 'primary.main' }}
                              >
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            
                            {file.status === 'completed' && (
                              <Tooltip title="Edit Data">
                                <IconButton 
                                  size="small"
                                  onClick={() => setEditingDocument(file)}
                                  sx={{ color: 'warning.main' }}
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                            )}
                            
                            {(file.status === 'completed' || file.status === 'needs_review') && (
                              <Tooltip title="Export Data">
                                <IconButton 
                                  size="small"
                                  onClick={() => handleExportDocument(file, 'json')}
                                  sx={{ color: 'success.main' }}
                                >
                                  <Download />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Stack>
                          
                          <Stack direction="row" spacing={1}>
                            {file.status === 'needs_review' && (
                              <>
                                <Button 
                                  size="small" 
                                  variant="outlined" 
                                  color="success"
                                  onClick={() => handleDocumentApproval(file.documentId, 'approve')}
                                  startIcon={<CheckCircle />}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  size="small" 
                                  variant="outlined" 
                                  color="error"
                                  onClick={() => handleDocumentApproval(file.documentId, 'reject')}
                                  startIcon={<Error />}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            
                            <Tooltip title="Delete Document">
                              <IconButton 
                                size="small" 
                                onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                                sx={{ color: 'error.main' }}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          )}
        </Grid>
      </TabPanel>
      
      <TabPanel value={currentTab} index={1}>
        {/* Historical Documents Tab */}
        <Grid container spacing={3}>
          {/* Search and Filter Controls */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Search Documents"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={handleSearchHistorical}>
                            <Search />
                          </IconButton>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                      >
                        <MenuItem value="">All Categories</MenuItem>
                        {documentCategories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select
                        value={filterState}
                        onChange={(e) => setFilterState(e.target.value)}
                      >
                        <MenuItem value="">All States</MenuItem>
                        <MenuItem value="madhya_pradesh">Madhya Pradesh</MenuItem>
                        <MenuItem value="tripura">Tripura</MenuItem>
                        <MenuItem value="odisha">Odisha</MenuItem>
                        <MenuItem value="telangana">Telangana</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSearchHistorical}
                      startIcon={<Search />}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Historical Documents Table */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Document</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Authority</TableCell>
                        <TableCell>Language</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {historicalDocs
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <Box>
                              <Typography variant="subtitle2">{doc.title}</Typography>
                              <Typography variant="caption" color="textSecondary">
                                {doc.description}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={doc.type} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>{doc.year}</TableCell>
                          <TableCell>{doc.authority}</TableCell>
                          <TableCell>{doc.language}</TableCell>
                          <TableCell>
                            <Tooltip title="Preview">
                              <IconButton onClick={() => handlePreview(doc)} size="small">
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Download">
                              <IconButton size="small">
                                <Download />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <TablePagination
                  component="div"
                  count={historicalDocs.length}
                  page={page}
                  onPageChange={(e, newPage) => setPage(newPage)}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      
      <TabPanel value={currentTab} index={2}>
        {/* Document Categories Tab */}
        <Grid container spacing={3}>
          {documentCategories.map((category) => (
            <Grid item xs={12} md={6} lg={4} key={category.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getDocumentTypeIcon(category.id)}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {category.name}
                    </Typography>
                    <Badge badgeContent={category.count} color="primary" sx={{ ml: 'auto' }} />
                  </Box>
                  
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {category.description}
                  </Typography>
                  
                  {category.subcategories && (
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle2">Subcategories</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {category.subcategories.map((sub) => (
                          <Box key={sub.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">{sub.name}</Typography>
                            <Chip label={sub.count} size="small" />
                          </Box>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {
                    setFilterCategory(category.id);
                    setCurrentTab(1);
                  }}>
                    Browse Documents
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      
      {/* Document Preview Dialog */}
      <Dialog
        open={previewDialog.open}
        onClose={() => setPreviewDialog({ open: false, document: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Document Preview
        </DialogTitle>
        <DialogContent>
          {previewDialog.document && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {previewDialog.document.title || previewDialog.document.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {previewDialog.document.description}
              </Typography>
              
              {previewDialog.document.ocrResult && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Extracted Information:
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    {Object.entries(previewDialog.document.ocrResult.extractedFields || {}).map(([key, value]) => (
                      <Typography key={key} variant="body2" sx={{ mb: 1 }}>
                        <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value}
                      </Typography>
                    ))}
                  </Paper>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog({ open: false, document: null })}>
            Close
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Enhanced Document Detail Drawer */}
      <Drawer
        anchor="right"
        open={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: '50%', md: '40%' },
            maxWidth: 600
          }
        }}
      >
        {selectedDocument && (
          <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ 
                  bgcolor: 'primary.main', 
                  mr: 2, 
                  width: 56, 
                  height: 56 
                }}>
                  {getDocumentTypeIcon(selectedDocument.type)}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Document Details
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedDocument.name}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={() => setDetailDrawerOpen(false)}>
                <Cancel />
              </IconButton>
            </Box>
            
            {/* Document Status and Metrics */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {selectedDocument.ocrResult ? `${(selectedDocument.ocrResult.confidence * 100).toFixed(0)}%` : 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    OCR Confidence
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {Object.keys(organizeExtractedData(selectedDocument.ocrResult?.extractedFields, selectedDocument.type)).length}
                  </Typography>
                  <Typography variant="body2">
                    Data Categories
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            
            {/* Processing Timeline */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Timeline sx={{ mr: 1 }} /> Processing Timeline
              </Typography>
              <Stepper orientation="vertical" activeStep={getCurrentStep(selectedDocument.status)}>
                {getProcessingSteps().map((step, index) => (
                  <Step key={index}>
                    <StepLabel icon={step.icon}>
                      <Typography variant="subtitle2">{step.label}</Typography>
                      {index === getCurrentStep(selectedDocument.status) && (
                        <Typography variant="caption" color="textSecondary">
                          Current Step
                        </Typography>
                      )}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
            
            {/* Data View Toggle */}
            <Box sx={{ mb: 2 }}>
              <Tabs 
                value={extractedDataView} 
                onChange={(e, newValue) => setExtractedDataView(newValue)}
                variant="fullWidth"
              >
                <Tab label="Structured View" value="structured" />
                <Tab label="Raw Data" value="raw" />
              </Tabs>
            </Box>
            
            {/* Extracted Data Display */}
            {selectedDocument.ocrResult?.extractedFields && (
              <Box>
                {extractedDataView === 'structured' ? (
                  // Structured View
                  <Stack spacing={2}>
                    {Object.entries(organizeExtractedData(selectedDocument.ocrResult.extractedFields, selectedDocument.type)).map(([category, fields]) => (
                      <Accordion key={category} defaultExpanded>
                        <AccordionSummary 
                          expandIcon={<ExpandMore />}
                          sx={{ bgcolor: 'primary.light', color: 'white' }}
                        >
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {category} ({Object.keys(fields).length} fields)
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            {Object.entries(fields).map(([key, value]) => (
                              <Grid item xs={12} key={key}>
                                <Box sx={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'flex-start',
                                  p: 1,
                                  border: '1px solid',
                                  borderColor: 'grey.200',
                                  borderRadius: 1,
                                  bgcolor: 'grey.50'
                                }}>
                                  <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                      {getFieldDisplayName(key)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                                      {formatFieldValue(key, value)}
                                    </Typography>
                                  </Box>
                                  {editingDocument?.id === selectedDocument.id && (
                                    <IconButton 
                                      size="small" 
                                      sx={{ color: 'warning.main' }}
                                      onClick={() => {
                                        const newValue = prompt(`Edit ${getFieldDisplayName(key)}:`, formatFieldValue(key, value));
                                        if (newValue !== null) {
                                          handleFieldEdit(selectedDocument.id, key, newValue);
                                        }
                                      }}
                                    >
                                      <Edit />
                                    </IconButton>
                                  )}
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Stack>
                ) : (
                  // Raw Data View
                  <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white', fontFamily: 'monospace' }}>
                    <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                      {JSON.stringify(selectedDocument.ocrResult.extractedFields, null, 2)}
                    </pre>
                  </Paper>
                )}
              </Box>
            )}
            
            {/* Validation Results */}
            {selectedDocument.validation && (
              <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ mr: 1, color: selectedDocument.validation.isValid ? 'success.main' : 'error.main' }} />
                  Validation Results
                </Typography>
                
                {selectedDocument.validation.errors && selectedDocument.validation.errors.length > 0 && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Errors Found:</Typography>
                    {selectedDocument.validation.errors.map((error, index) => (
                      <Typography key={index} variant="body2">• {error}</Typography>
                    ))}
                  </Alert>
                )}
                
                {selectedDocument.validation.warnings && selectedDocument.validation.warnings.length > 0 && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Warnings:</Typography>
                    {selectedDocument.validation.warnings.map((warning, index) => (
                      <Typography key={index} variant="body2">• {warning}</Typography>
                    ))}
                  </Alert>
                )}
                
                {selectedDocument.dataQuality && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Data Quality Metrics:</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h5" color="primary.main">
                            {selectedDocument.dataQuality.completeness.toFixed(0)}%
                          </Typography>
                          <Typography variant="caption">Completeness</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h5" color="success.main">
                            {selectedDocument.dataQuality.accuracy.toFixed(0)}%
                          </Typography>
                          <Typography variant="caption">Accuracy</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h5" color="info.main">
                            {selectedDocument.dataQuality.consistency.toFixed(0)}%
                          </Typography>
                          <Typography variant="caption">Consistency</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Paper>
            )}
            
            {/* Action Buttons */}
            <Paper sx={{ p: 2, mt: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>Actions</Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button 
                  variant="outlined" 
                  startIcon={<Edit />}
                  onClick={() => setEditingDocument(editingDocument?.id === selectedDocument.id ? null : selectedDocument)}
                  color={editingDocument?.id === selectedDocument.id ? 'warning' : 'primary'}
                >
                  {editingDocument?.id === selectedDocument.id ? 'Stop Editing' : 'Edit Data'}
                </Button>
                
                <Button 
                  variant="outlined" 
                  startIcon={<Download />}
                  onClick={() => handleExportDocument(selectedDocument, 'json')}
                  color="success"
                >
                  Export JSON
                </Button>
                
                <Button 
                  variant="outlined" 
                  startIcon={<Download />}
                  onClick={() => handleExportDocument(selectedDocument, 'csv')}
                  color="success"
                >
                  Export CSV
                </Button>
                
                {selectedDocument.status === 'needs_review' && (
                  <>
                    <Button 
                      variant="contained" 
                      startIcon={<CheckCircle />}
                      onClick={() => handleDocumentApproval(selectedDocument.documentId, 'approve')}
                      color="success"
                    >
                      Approve Document
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      startIcon={<ErrorOutline />}
                      onClick={() => {
                        const comments = prompt('Enter rejection reason:');
                        if (comments) {
                          handleDocumentApproval(selectedDocument.documentId, 'reject', comments);
                        }
                      }}
                      color="error"
                    >
                      Reject Document
                    </Button>
                  </>
                )}
              </Stack>
            </Paper>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
