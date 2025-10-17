import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  CloudUpload,
  Description,
  Visibility,
  Download,
  CheckCircle,
  Error,
  Warning,
  Info,
  Psychology,
  AutoAwesome,
  Scanner,
  TextFields,
  FindInPage,
  VerifiedUser,
  Speed,
  Image,
  PictureAsPdf,
  InsertDriveFile,
  Delete,
  Edit,
  Save,
  Refresh,
  ExpandMore,
  PlayArrow,
  Stop,
  Pause,
  Analytics,
  Assessment,
  Memory,
  SmartToy,
  Science,
  Group,
  LocationOn,
  DateRange,
  Numbers,
  Close
} from '@mui/icons-material';
import { governmentColors } from '../theme/governmentTheme';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OCRSystem = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processingFiles, setProcessingFiles] = useState([]);
  const [processedDocuments, setProcessedDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [ocrResults, setOcrResults] = useState(null);
  const [nerResults, setNerResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [batchProcessing, setBatchProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [defaultDocType, setDefaultDocType] = useState('identity-proof');
  const [uiError, setUiError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileSize, setSelectedFileSize] = useState(0);
  const [inlineProgress, setInlineProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [eligibleSchemes, setEligibleSchemes] = useState(null);
  const [showSchemesDialog, setShowSchemesDialog] = useState(false);
  const fileInputRef = useRef(null);
  const ALLOWED_EXTS = ['.pdf', '.jpg', '.jpeg', '.png', '.tif', '.tiff'];
  const MAX_BYTES = 10 * 1024 * 1024;

  // Mock OCR and NER results
  const mockOcrResult = {
    confidence: 94.5,
    text: `FOREST RIGHTS ACT - 2006
INDIVIDUAL FOREST RIGHTS (IFR) CLAIM

Applicant Name: Ramesh Kumar Meena
Father's Name: Suresh Kumar Meena
Village: Shivpuri
District: Shivpuri
State: Madhya Pradesh
Aadhar Number: 1234 5678 9012
Area Claimed: 2.5 acres
Survey Number: 123/4
Date of Application: 15/03/2024

I hereby claim individual forest rights under the Forest Rights Act, 2006 for the above mentioned land which has been occupied by my family for three generations.`,
    processingTime: 3.2,
    pages: 1,
    language: 'Hindi/English'
  };

  const mockNerResults = [
    { entity: 'PERSON', value: 'Ramesh Kumar Meena', confidence: 0.98, category: 'Applicant Name' },
    { entity: 'PERSON', value: 'Suresh Kumar Meena', confidence: 0.96, category: 'Father Name' },
    { entity: 'LOCATION', value: 'Shivpuri', confidence: 0.95, category: 'Village' },
    { entity: 'LOCATION', value: 'Madhya Pradesh', confidence: 0.97, category: 'State' },
    { entity: 'ID', value: '1234 5678 9012', confidence: 0.92, category: 'Aadhar Number' },
    { entity: 'AREA', value: '2.5 acres', confidence: 0.89, category: 'Claimed Area' },
    { entity: 'NUMBER', value: '123/4', confidence: 0.94, category: 'Survey Number' },
    { entity: 'DATE', value: '15/03/2024', confidence: 0.91, category: 'Application Date' }
  ];

  const mockProcessedDocs = [
    {
      id: 1,
      name: 'IFR_Application_001.pdf',
      type: 'Individual Forest Rights',
      status: 'Completed',
      confidence: 94.5,
      processedAt: '2024-03-15 14:30:25',
      entities: 8,
      pages: 1
    },
    {
      id: 2,
      name: 'CFR_Application_002.pdf',
      type: 'Community Forest Rights',
      status: 'Processing',
      confidence: 0,
      processedAt: null,
      entities: 0,
      pages: 2
    },
    {
      id: 3,
      name: 'Land_Document_003.jpg',
      type: 'Land Revenue Record',
      status: 'Completed',
      confidence: 87.3,
      processedAt: '2024-03-14 16:45:12',
      entities: 12,
      pages: 1
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setProcessedDocuments(mockProcessedDocs);
      setLoading(false);
    }, 1500);
  }, []);

  const validateLocalFile = (file) => {
    if (!file) return { ok: false, error: '❌ No file selected' };
    
    const name = (file.name || '').toLowerCase();
    const hasAllowedExt = ALLOWED_EXTS.some((ext) => name.endsWith(ext));
    
    if (!hasAllowedExt) {
      return { 
        ok: false, 
        error: `❌ Unsupported file type: "${file.name}". Please upload PDF, JPG, PNG, or TIFF files only.`
      };
    }
    
    if (file.size > MAX_BYTES) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1);
      return { 
        ok: false, 
        error: `❌ File too large: "${file.name}" (${sizeMB} MB). Maximum file size is 10MB.`
      };
    }
    
    if (file.size === 0) {
      return { 
        ok: false, 
        error: `❌ Empty file: "${file.name}". Please select a valid document.`
      };
    }
    
    return { ok: true };
  };

  const simulateUploadAndOCR = async (file) => {
    setUiError('');
    setSelectedFileName(file.name);
    setSelectedFileSize(file.size);
    setInlineProgress(0);
    setIsUploading(true);

    // Simulate upload progress while attempting live backend upload
    let resolved = false;
    const progressPromise = new Promise((resolve) => {
      let p = 0;
      const timer = setInterval(() => {
        p += Math.round(10 + Math.random() * 15);
        setInlineProgress(Math.min(95, p));
        if (p >= 95 || resolved) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });

    let liveOk = false;
    try {
      // Try live backend OCR upload first
      const result = await uploadToBackend({ file, name: file.name });
      liveOk = true;
      setInlineProgress(100);
      setIsUploading(false);

      // Map backend response into UI
      setOcrResults({
        confidence: result.processing?.confidence ?? 0.9,
        text: result.processing?.extractedText || '[No text extracted]',
        pages: result.processing?.processingMetadata?.pageCount,
        language: result.processing?.processingMetadata?.languageDetected || 'en-IN',
        processingTime: undefined,
      });
      // Flatten NER object into list for display
      const nerList = result.processing?.ner
        ? Object.entries(result.processing.ner).flatMap(([k, arr]) => {
            if (Array.isArray(arr)) return arr.map(v => ({ entity: k.toUpperCase(), value: v, confidence: 0.9 }));
            if (typeof arr === 'object' && arr) {
              return Object.entries(arr).flatMap(([kk, aa]) => Array.isArray(aa) ? aa.map(v => ({ entity: kk.toUpperCase(), value: v, confidence: 0.9 })) : []);
            }
            return [];
          })
        : [];
      setNerResults(nerList);
      setActiveStep(2);
    } catch (e) {
      // Fall back to simulated results on any failure
      setUiError('Live OCR service unavailable. Showing demo results.');
      await new Promise((r) => setTimeout(r, 800));
      setInlineProgress(100);
      setIsUploading(false);
      setOcrResults({ ...mockOcrResult, text: `${mockOcrResult.text}\n\n[File: ${file.name}]` });
      setNerResults(mockNerResults);
      setActiveStep(2);
    } finally {
      resolved = true;
      await progressPromise;
    }
  };

  const handleSubmitToDatabase = async () => {
    try {
      setIsSubmitting(true);
      setUiError('');
      
      console.log('📤 Submitting to FRA Atlas...');
      
      // Prepare data for submission
      const submitData = {
        ocrData: {
          extractedText: ocrResults.text,
          confidence: ocrResults.confidence,
          ner: {
            persons: nerResults.filter(e => e.entity === 'PERSON' || e.entity.includes('PERSON')).map(e => e.value),
            locations: nerResults.filter(e => e.entity === 'LOCATION' || e.entity.includes('LOCATION')).map(e => e.value),
            dates: nerResults.filter(e => e.entity === 'DATE' || e.entity.includes('DATE')).map(e => e.value),
            numbers: nerResults.filter(e => e.entity === 'NUMBER' || e.entity.includes('NUMBER') || e.entity === 'ID').map(e => e.value),
            organizations: nerResults.filter(e => e.entity === 'ORGANIZATION').map(e => e.value)
          }
        },
        metadata: {
          documentId: `DOC_${Date.now()}`,
          fileName: selectedFileName,
          uploadedBy: user?.email || 'demo@fra.gov.in',
          uploadedAt: new Date().toISOString()
        }
      };
      
      // Submit to backend
      const response = await fetch('/api/fra-atlas/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo'
        },
        body: JSON.stringify(submitData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Data submitted successfully!', result);
        
        setSubmittedData(result.data);
        setEligibleSchemes(result.eligibleSchemes);
        
        // Show success message
        alert(`✅ FRA Data Submitted Successfully!\n\nRecord ID: ${result.recordId}\nType: ${result.recordType}\n\nNavigating to map...`);
        
        // Automatically navigate to maps page
        navigate('/maps');
      } else {
        throw new Error(result.error || 'Submission failed');
      }
      
    } catch (error) {
      console.error('❌ Submission error:', error);
      setUiError(`Submission failed: ${error.message}`);
      alert(`❌ Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setUiError(''); // Clear any previous errors
    
    const file = acceptedFiles?.[0];
    if (!file) {
      setUiError('No file was selected or dropped.');
      return;
    }
    
    const validation = validateLocalFile(file);
    if (!validation.ok) {
      setUiError(validation.error);
      return;
    }
    
    // Process the file immediately for better UX
    simulateUploadAndOCR(file);

    // Add to uploaded files list for tracking
    const newFile = {
      id: Date.now(),
      file,
      name: file.name,
      size: file.size,
      type: file.type || file.mime || '',
      mime: file.type || '',
      status: 'Processing',
      progress: 0,
      uploadedAt: new Date().toISOString()
    };
    setUploadedFiles(prev => {
      // Remove any previous file with same name to avoid duplicates
      const filtered = prev.filter(f => f.name !== file.name);
      return [...filtered, newFile];
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.tiff', '.tif'],
      'application/pdf': ['.pdf']
    },
    multiple: false,  // Single file for better UX
    noClick: true,    // Disable default click to prevent conflicts with Browse button
    noKeyboard: false,
    maxSize: MAX_BYTES,
    onDropRejected: (rejectedFiles) => {
      const file = rejectedFiles[0];
      if (file) {
        if (file.file.size > MAX_BYTES) {
          setUiError(`❌ File too large: ${file.file.name}. Maximum size is 10MB.`);
        } else {
          setUiError(`❌ Invalid file type: ${file.file.name}. Only PDF, JPG, PNG, and TIFF files are allowed.`);
        }
      }
    },
    onError: (error) => {
      console.error('❌ Dropzone error:', error);
      setUiError('❌ An error occurred while processing the file. Please try again.');
    },
    onDragEnter: () => {
      console.log('📥 Drag enter detected');
    },
    onDragLeave: () => {
      console.log('🚫 Drag leave detected');
    },
    onDropAccepted: (files) => {
      console.log('✅ File(s) accepted:', files.length);
    }
  });

  const uploadToBackend = async (fileRec) => {
    const formData = new FormData();
    formData.append('document', fileRec.file);
    const ext = (fileRec.name || '').toLowerCase();
    const isPdf = ext.endsWith('.pdf');
    const docType = defaultDocType || (isPdf ? 'fra-application' : 'identity-proof');
    formData.append('documentType', docType);
    formData.append('claimId', '');
    formData.append('metadata', JSON.stringify({ uploadedBy: user?.email || 'demo', source: 'OCRSystem' }));

    const resp = await fetch('/api/documents/upload', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer demo' },
      body: formData,
    });
    const result = await resp.json();
    if (!resp.ok) {
      throw new Error(result?.message || 'Upload failed');
    }
    return result;
  };

  const handleProcessDocument = async (docId) => {
    const file = uploadedFiles.find(f => f.id === docId);
    if (!file) return;

    try {
      setIsProcessing(true);
      setProcessingFiles([docId]);
      setUploadProgress(prev => ({ ...prev, [docId]: 0 }));

      // client-side progress simulation for UX
      let progress = 0;
      const interval = setInterval(() => {
        progress = Math.min(95, progress + 10);
        setUploadedFiles(prev => prev.map(f =>
          f.id === docId ? { ...f, progress, status: 'Processing' } : f
        ));
      }, 250);

      const result = await uploadToBackend(file);

      clearInterval(interval);
      setUploadedFiles(prev => prev.map(f =>
        f.id === docId ? {
          ...f,
          progress: 100,
          status: result.status === 'processed' ? 'Completed' : 'Needs Review',
          documentId: result.documentId,
        } : f
      ));

      setOcrResults({
        confidence: result.processing?.confidence,
        text: result.processing?.extractedText,
        pages: result.processing?.processingMetadata?.pageCount,
        language: result.processing?.processingMetadata?.languageDetected,
        processingTime: undefined,
      });
      setNerResults(result.processing?.ner ? Object.entries(result.processing.ner).flatMap(([k, arr]) => {
        if (Array.isArray(arr)) return arr.map(v => ({ entity: k.toUpperCase(), value: v }));
        if (typeof arr === 'object' && arr) {
          return Object.entries(arr).flatMap(([kk, aa]) => Array.isArray(aa) ? aa.map(v => ({ entity: kk.toUpperCase(), value: v })) : []);
        }
        return [];
      }) : []);

      setIsProcessing(false);
      setProcessingFiles([]);
      setActiveStep(2);
    } catch (e) {
      setUploadedFiles(prev => prev.map(f => f.id === docId ? { ...f, status: 'Error' } : f));
      setIsProcessing(false);
      setProcessingFiles([]);
      console.error('OCR upload/process failed:', e);
    }
  };

  const handleBatchProcess = () => {
    setBatchProcessing(true);
    const readyFiles = uploadedFiles.filter(f => f.status === 'Ready');
    
    readyFiles.forEach((file, index) => {
      setTimeout(() => {
        handleProcessDocument(file.id);
      }, index * 1000);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const DropZone = () => {
    const { ref: dropzoneRef, ...rootProps } = getRootProps();
    
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Paper
          ref={dropzoneRef}
          onDragOver={rootProps.onDragOver}
          onDragEnter={rootProps.onDragEnter}
          onDragLeave={rootProps.onDragLeave}
          onDrop={rootProps.onDrop}
          component="div"
          sx={{
            p: 4,
            textAlign: 'center',
            cursor: 'default',
            borderRadius: 3,
            border: isDragActive 
              ? `3px dashed ${governmentColors.primaryBlue}` 
              : '2px dashed #ccc',
            background: isDragActive 
              ? `linear-gradient(135deg, ${governmentColors.primaryBlue}20, ${governmentColors.primaryGreen}20)`
              : `linear-gradient(135deg, ${governmentColors.lightBlue}, ${governmentColors.lightGreen})`,
            transition: 'all 0.3s ease',
            minHeight: 220,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            '&:hover': {
              background: `linear-gradient(135deg, ${governmentColors.primaryBlue}15, ${governmentColors.primaryGreen}15)`,
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              border: `2px dashed ${governmentColors.primaryBlue}`
            }
          }}
          role="region"
          aria-label="File upload area"
        >
        <input {...getInputProps()} />
        
        {/* Hidden native file input for explicit Browse button trigger */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.tif,.tiff"
          style={{ display: 'none' }}
          onChange={(e) => {
            const f = e.target.files && e.target.files[0];
            if (!f) return;
            const validation = validateLocalFile(f);
            if (!validation.ok) {
              setUiError(validation.error);
              e.target.value = ''; // Reset input
              return;
            }
            setUiError(''); // Clear any previous errors
            simulateUploadAndOCR(f);
            
            // Add to uploaded files list for tracking
            const newFile = {
              id: Date.now(),
              file: f,
              name: f.name,
              size: f.size,
              type: f.type || f.mime || '',
              mime: f.type || '',
              status: 'Processing',
              progress: 0,
              uploadedAt: new Date().toISOString()
            };
            setUploadedFiles(prev => {
              // Remove any previous file with same name to avoid duplicates
              const filtered = prev.filter(file => file.name !== f.name);
              return [...filtered, newFile];
            });
          }}
        />

        {/* Main upload area - clickable */}
        <Box sx={{ 
          userSelect: 'none', 
          pointerEvents: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}>
          <motion.div
            animate={{ y: isDragActive ? [0, -5, 0] : [0, -10, 0] }}
            transition={{ 
              duration: isDragActive ? 0.5 : 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <CloudUpload sx={{ 
              fontSize: 64, 
              color: isDragActive ? governmentColors.primaryGreen : governmentColors.primaryBlue, 
              mb: 2,
              transition: 'color 0.3s ease'
            }} />
          </motion.div>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, transition: 'color 0.3s ease' }}>
            {isDragActive ? '✨ Drop files here to upload!' : '📄 Upload FRA Documents'}
          </Typography>
          <Typography variant="body1" sx={{ color: governmentColors.grey[600], mb: 2 }}>
            {isDragActive ? 'Release to start processing...' : 'Drag & drop files here, or use the browse button below'}
          </Typography>
          <Typography variant="body2" sx={{ color: governmentColors.grey[500], mb: 3 }}>
            📋 Supports: PDF, JPG, PNG, TIFF (Max 10MB each)
          </Typography>
        </Box>

        {/* Controls area - prevent propagation to avoid conflicts */}
        <Box 
          className="doc-type-select" 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            mt: 2, 
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="doc-type-label">Document Type</InputLabel>
            <Select
              labelId="doc-type-label"
              label="Document Type"
              value={defaultDocType}
              onChange={(e) => setDefaultDocType(e.target.value)}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <MenuItem value={'identity-proof'}>🆔 Identity Proof</MenuItem>
              <MenuItem value={'fra-application'}>📋 FRA Application</MenuItem>
              <MenuItem value={'land-documents'}>🏞️ Land Documents</MenuItem>
              <MenuItem value={'tribal-certificate'}>🏛️ Tribal Certificate</MenuItem>
              <MenuItem value={'residence-proof'}>🏠 Residence Proof</MenuItem>
              <MenuItem value={'bank-details'}>🏦 Bank Details</MenuItem>
              <MenuItem value={'community-rights'}>🌳 Community Rights</MenuItem>
              <MenuItem value={'historical-records'}>📜 Historical Records</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            type="button"
            variant="contained"
            size="large"
            startIcon={<CloudUpload />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔘 Browse Files button clicked!');
              if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset input to allow same file upload
                console.log('📂 Opening file dialog...');
                fileInputRef.current.click();
              } else {
                console.error('❌ File input ref not found!');
              }
              return false; // Extra safety to prevent any default behavior
            }}
            sx={{
              background: `linear-gradient(135deg, ${governmentColors.primaryBlue}, ${governmentColors.primaryGreen})`,
              color: 'white',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 2,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              textTransform: 'none',
              '&:hover': {
                background: `linear-gradient(135deg, ${governmentColors.primaryGreen}, ${governmentColors.primaryBlue})`,
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.35)'
              },
              '&:active': {
                transform: 'translateY(0px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
              }
            }}
          >
            📁 Browse Files
          </Button>
        </Box>
        
        {/* Status indicator for drag state */}
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              bgcolor: governmentColors.success,
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            Ready to Upload!
          </motion.div>
        )}
      </Paper>
    </motion.div>
    );
  };

  const FileCard = ({ file, index }) => {
    const getFileIcon = (type) => {
      if (!type) return InsertDriveFile;
      if (type.includes('pdf')) return PictureAsPdf;
      if (type.includes('image')) return Image;
      return InsertDriveFile;
    };
    
    const FileIcon = getFileIcon(file.type || file.mime || '');
    const statusColor = {
      'Ready': governmentColors.info,
      'Processing': governmentColors.warning,
      'Completed': governmentColors.success,
      'Error': governmentColors.error
    }[file.status];

    return (
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card
          sx={{
            mb: 2,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateX(4px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Avatar
                  sx={{
                    background: `linear-gradient(135deg, ${statusColor}, ${statusColor}CC)`,
                    mr: 2
                  }}
                >
                  <FileIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {file.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                  {file.status === 'Processing' && (
                    <LinearProgress
                      variant="determinate"
                      value={file.progress}
                      sx={{
                        mt: 1,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: governmentColors.grey[200],
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          background: `linear-gradient(90deg, ${statusColor}, ${statusColor}CC)`
                        }
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={file.status}
                  size="small"
                  sx={{
                    background: statusColor,
                    color: 'white',
                    fontWeight: 600
                  }}
                />
                {file.status === 'Ready' && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<PlayArrow />}
                    onClick={() => handleProcessDocument(file.id)}
                  >
                    Process
                  </Button>
                )}
                {file.status === 'Completed' && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => setPreviewOpen(true)}
                  >
                    View
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const NERResultCard = ({ entity, index }) => {
    const confidenceColor = 
      entity.confidence > 0.9 ? governmentColors.success :
      entity.confidence > 0.8 ? governmentColors.warning :
      governmentColors.error;

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card
          sx={{
            mb: 2,
            background: `linear-gradient(135deg, ${confidenceColor}10, ${confidenceColor}05)`,
            border: `1px solid ${confidenceColor}30`,
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: `0 8px 25px ${confidenceColor}20`
            }
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ color: confidenceColor, fontWeight: 600, mb: 0.5 }}>
                  {entity.category}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {entity.value}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Entity: {entity.entity}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip
                  label={`${(entity.confidence * 100).toFixed(1)}%`}
                  size="small"
                  sx={{
                    background: confidenceColor,
                    color: 'white',
                    fontWeight: 600
                  }}
                />
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: confidenceColor }}>
                  Confidence
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const ProcessingStats = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div variants={cardVariants}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${governmentColors.primaryBlue}15, ${governmentColors.primaryBlue}08)`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${governmentColors.primaryBlue}30`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 30px ${governmentColors.primaryBlue}20`
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Scanner sx={{ fontSize: 48, color: governmentColors.primaryBlue, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {processedDocuments.filter(d => d.status === 'Completed').length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Documents Processed
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div variants={cardVariants}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${governmentColors.success}15, ${governmentColors.success}08)`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${governmentColors.success}30`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 30px ${governmentColors.success}20`
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <TextFields sx={{ fontSize: 48, color: governmentColors.success, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  94.5%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Avg OCR Accuracy
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div variants={cardVariants}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${governmentColors.warning}15, ${governmentColors.warning}08)`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${governmentColors.warning}30`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 30px ${governmentColors.warning}20`
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <FindInPage sx={{ fontSize: 48, color: governmentColors.warning, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {nerResults.length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Entities Extracted
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div variants={cardVariants}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${governmentColors.info}15, ${governmentColors.info}08)`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${governmentColors.info}30`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 30px ${governmentColors.info}20`
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Speed sx={{ fontSize: 48, color: governmentColors.info, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  3.2s
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Avg Processing Time
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );

  const LoadingScreen = () => (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${governmentColors.primaryBlue}10, ${governmentColors.primaryGreen}10)`,
      }}
    >
      <motion.div
        animate={{ 
          rotateY: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Scanner sx={{ fontSize: 80, color: governmentColors.primaryBlue, mb: 2 }} />
      </motion.div>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Initializing OCR Engine...</Typography>
      <LinearProgress sx={{ width: 200, borderRadius: 2 }} />
    </Box>
  );

  const SchemesDialog = () => {
    if (!eligibleSchemes) return null;
    
    const eligibleList = Object.values(eligibleSchemes).filter(s => s.eligible);
    
    return (
      <Dialog 
        open={showSchemesDialog} 
        onClose={() => setShowSchemesDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: `linear-gradient(135deg, ${governmentColors.primaryBlue}, ${governmentColors.primaryGreen})`,
          color: 'white'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <VerifiedUser sx={{ mr: 2, fontSize: 40 }} />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Eligible Government Schemes
              </Typography>
              <Typography variant="body2">
                {eligibleList.length} schemes available for this FRA applicant
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ mt: 2 }}>
          {eligibleList.length === 0 ? (
            <Alert severity="info">
              No eligible schemes found. Data has been saved to FRA Atlas.
            </Alert>
          ) : (
            <>
              <Alert severity="success" sx={{ mb: 2 }}>
                <AlertTitle>✅ Data Saved to FRA Atlas</AlertTitle>
                Record ID: {submittedData?._id} | Type: {submittedData?.recordType}
              </Alert>
              
              <Grid container spacing={2}>
                {eligibleList.map((scheme, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Card sx={{ 
                      border: `2px solid ${governmentColors.success}`,
                      background: `linear-gradient(135deg, ${governmentColors.success}10, white)`
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <CheckCircle sx={{ color: governmentColors.success, mr: 2, mt: 0.5 }} />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight={700} color={governmentColors.primaryBlue}>
                              {scheme.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                              {scheme.description}
                            </Typography>
                            <Chip 
                              label={scheme.ministry} 
                              size="small" 
                              sx={{ mt: 1, mr: 1 }}
                            />
                            <Chip 
                              label={scheme.benefit} 
                              size="small" 
                              color="success"
                              sx={{ mt: 1 }}
                            />
                            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                              📋 {scheme.reason}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setShowSchemesDialog(false)}>
            Close
          </Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setShowSchemesDialog(false);
              navigate('/maps');
            }}
            startIcon={<LocationOn />}
          >
            View on Map
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${governmentColors.lightBlue} 0%, ${governmentColors.lightGreen} 50%, ${governmentColors.lightOrange} 100%)`,
        py: 4
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${governmentColors.navy}, ${governmentColors.primaryBlue})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <Scanner sx={{ fontSize: '3rem', color: governmentColors.primaryBlue }} />
              AI-Powered OCR Document System
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: governmentColors.grey[600],
                maxWidth: 900,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Advanced document digitization with OCR, Named Entity Recognition (NER),
              and automated data extraction for FRA documents
            </Typography>
          </Box>
        </motion.div>

        {/* AI Features Banner */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Paper
            sx={{
              p: 3,
              mb: 4,
              background: `linear-gradient(135deg, ${governmentColors.primaryBlue}15, ${governmentColors.primaryGreen}15)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${governmentColors.primaryBlue}30`,
              borderRadius: 3
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ background: governmentColors.success, mr: 2 }}>
                    <TextFields />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>OCR Technology</Typography>
                    <Typography variant="body2" color="textSecondary">Text Recognition</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ background: governmentColors.warning, mr: 2 }}>
                    <FindInPage />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>NER Engine</Typography>
                    <Typography variant="body2" color="textSecondary">Entity Extraction</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ background: governmentColors.info, mr: 2 }}>
                    <VerifiedUser />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Data Validation</Typography>
                    <Typography variant="body2" color="textSecondary">Quality Assurance</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ background: governmentColors.error, mr: 2 }}>
                    <AutoAwesome />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Smart Processing</Typography>
                    <Typography variant="body2" color="textSecondary">ML Algorithms</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Processing Statistics */}
        <ProcessingStats />

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Upload Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 3,
                p: 3,
                height: 'fit-content'
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <CloudUpload sx={{ mr: 2, color: governmentColors.primaryBlue }} />
                Document Upload & Processing
              </Typography>
              
              {/* Validation error and success messages */}
              <AnimatePresence>
                {uiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert 
                      severity="error" 
                      sx={{ mb: 2 }}
                      onClose={() => setUiError('')}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => setUiError('')}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      }
                    >
                      {uiError}
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <DropZone />

              {/* Inline selected filename and loading */}
              {(selectedFileName || isUploading) && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedFileName || 'Uploading...'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {selectedFileSize ? `${(selectedFileSize/1024/1024).toFixed(2)} MB` : ''}
                  </Typography>
                  {isUploading && (
                    <LinearProgress sx={{ mt: 1, height: 6, borderRadius: 2 }} value={inlineProgress} variant="determinate" />
                  )}
                </Box>
              )}
              
              {uploadedFiles.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Uploaded Files</Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleBatchProcess}
                      disabled={!uploadedFiles.some(f => f.status === 'Ready')}
                      sx={{
                        background: `linear-gradient(135deg, ${governmentColors.primaryBlue}, ${governmentColors.primaryGreen})`
                      }}
                    >
                      Batch Process
                    </Button>
                  </Box>
                  {uploadedFiles.map((file, index) => (
                    <FileCard key={file.id} file={file} index={index} />
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 3,
                p: 3,
                height: 'fit-content'
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <Psychology sx={{ mr: 2, color: governmentColors.primaryGreen }} />
                OCR & NER Results
              </Typography>
              
              {ocrResults ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Alert severity="success" sx={{ mb: 3 }}>
                    <AlertTitle>✅ OCR Processing Complete</AlertTitle>
                    Document processed with {ocrResults.confidence?.toFixed ? ocrResults.confidence.toFixed(1) : ocrResults.confidence}% accuracy
                    {ocrResults.processingTime && ` in ${ocrResults.processingTime}s`}
                  </Alert>
                  
                  <Accordion sx={{ mb: 2 }} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6">Extracted Text</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paper
                        sx={{
                          p: 2,
                          background: governmentColors.grey[50],
                          border: `1px solid ${governmentColors.grey[200]}`,
                          borderRadius: 2
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: 'pre-line',
                            fontFamily: 'monospace',
                            lineHeight: 1.6
                          }}
                        >
                          {ocrResults.text}
                        </Typography>
                      </Paper>
                    </AccordionDetails>
                  </Accordion>
                  
                  {/* SUBMIT BUTTON - Appears immediately after text extraction */}
                  <Box sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="contained" 
                      size="large"
                      startIcon={<Save />}
                      onClick={handleSubmitToDatabase}
                      disabled={isSubmitting}
                      sx={{
                        background: `linear-gradient(135deg, ${governmentColors.success}, ${governmentColors.primaryGreen})`,
                        color: 'white',
                        fontWeight: 700,
                        px: 6,
                        py: 2.5,
                        fontSize: '1.3rem',
                        boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 25px rgba(76, 175, 80, 0.5)'
                        },
                        '&:disabled': {
                          background: governmentColors.grey[400]
                        }
                      }}
                    >
                      {isSubmitting ? '⏳ Submitting...' : '✅ SUBMIT TO FRA ATLAS'}
                    </Button>
                  </Box>
                  
                  {nerResults.length > 0 && (
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <FindInPage sx={{ mr: 1, color: governmentColors.warning }} />
                        Extracted Entities ({nerResults.length})
                      </Typography>
                      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                        {nerResults.map((entity, index) => (
                          <NERResultCard key={index} entity={entity} index={index} />
                        ))}
                      </Box>
                      {/* SUBMIT BUTTON - Updated 2025-01-07 20:25 */}
                      <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Button 
                          variant="contained" 
                          size="large"
                          startIcon={<Save />}
                          onClick={handleSubmitToDatabase}
                          disabled={isSubmitting}
                          sx={{
                            background: `linear-gradient(135deg, ${governmentColors.success}, ${governmentColors.primaryGreen})`,
                            color: 'white',
                            fontWeight: 700,
                            px: 5,
                            py: 2,
                            fontSize: '1.2rem',
                            boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4)',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 6px 25px rgba(76, 175, 80, 0.5)'
                            },
                            '&:disabled': {
                              background: governmentColors.grey[400]
                            }
                          }}
                        >
                          {isSubmitting ? 'Submitting...' : '✅ SUBMIT TO FRA ATLAS'}
                        </Button>
                        <Button variant="outlined" size="large" startIcon={<Download />} sx={{ px: 3, py: 2 }}>
                          Export JSON
                        </Button>
                      </Box>
                    </Box>
                  )}
                </motion.div>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Scanner sx={{ fontSize: 64, color: governmentColors.grey[400], mb: 2 }} />
                  </motion.div>
                  <Typography variant="h6" sx={{ color: governmentColors.grey[500], mb: 1 }}>
                    📂 No documents processed yet
                  </Typography>
                  <Typography variant="body2" sx={{ color: governmentColors.grey[400] }}>
                    Upload FRA documents using the form on the left to see OCR text extraction and NER entity recognition results here.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Processing History */}
        {processedDocuments.length > 0 && (
          <Paper
            sx={{
              mt: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 3, borderBottom: `1px solid ${governmentColors.grey[200]}` }}>
              <Typography variant="h5" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <Assessment sx={{ mr: 2, color: governmentColors.primaryBlue }} />
                Processing History
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Document</strong></TableCell>
                    <TableCell><strong>Type</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Confidence</strong></TableCell>
                    <TableCell><strong>Entities</strong></TableCell>
                    <TableCell><strong>Processed</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {processedDocuments.map((doc) => (
                    <TableRow
                      key={doc.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: `${governmentColors.lightBlue}50`
                        }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PictureAsPdf sx={{ mr: 1, color: governmentColors.error }} />
                          {doc.name}
                        </Box>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>
                        <Chip
                          label={doc.status}
                          size="small"
                          color={doc.status === 'Completed' ? 'success' : 'warning'}
                        />
                      </TableCell>
                      <TableCell>
                        {doc.confidence > 0 ? `${doc.confidence}%` : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge badgeContent={doc.entities} color="primary">
                          <FindInPage />
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {doc.processedAt ? new Date(doc.processedAt).toLocaleString() : '-'}
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <Visibility />
                        </IconButton>
                        <IconButton size="small" color="secondary">
                          <Download />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Container>
      
      {/* Schemes Dialog */}
      <SchemesDialog />
    </Box>
  );
};

export default OCRSystem;
