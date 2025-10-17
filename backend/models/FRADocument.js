const mongoose = require('mongoose');

// Individual Forest Rights (IFR) Schema
const IFRSchema = new mongoose.Schema({
  applicationNumber: { type: String, required: true, unique: true },
  applicantName: { type: String, required: true },
  fatherName: String,
  aadharNumber: String,
  village: { type: String, required: true },
  tehsil: String,
  district: { type: String, required: true },
  state: { type: String, required: true, enum: ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'] },
  
  // Land Details
  landArea: { type: Number, required: true }, // in acres
  surveyNumber: String,
  forestBlock: String,
  
  // Geospatial Data
  coordinates: {
    latitude: Number,
    longitude: Number,
    type: { type: String, default: 'Point' }
  },
  
  // Status
  claimStatus: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'under-review'], 
    default: 'pending' 
  },
  applicationDate: Date,
  approvalDate: Date,
  pattaNumber: String,
  
  // OCR/NER Extracted Data
  extractedEntities: {
    persons: [String],
    locations: [String],
    dates: [String],
    numbers: [String],
    organizations: [String]
  },
  
  // Document References
  sourceDocument: {
    documentId: String,
    fileName: String,
    uploadedAt: Date,
    ocrConfidence: Number
  },
  
  // Family Details
  familyMembers: Number,
  tribe: String,
  stCertificateNumber: String,
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Community Forest Resource (CFR) Schema
const CFRSchema = new mongoose.Schema({
  applicationNumber: { type: String, required: true, unique: true },
  gramSabhaName: { type: String, required: true },
  panchayat: String,
  village: { type: String, required: true },
  tehsil: String,
  district: { type: String, required: true },
  state: { type: String, required: true, enum: ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'] },
  
  // Forest Area Details
  forestArea: { type: Number, required: true }, // in hectares
  forestDepartmentRecordNo: String,
  forestType: String,
  forestDensity: String,
  
  // Community Details
  totalPopulation: Number,
  totalFamilies: Number,
  stFamilies: Number,
  
  // Boundaries
  boundaries: {
    north: String,
    south: String,
    east: String,
    west: String
  },
  
  // Geospatial Data
  polygonCoordinates: [{
    latitude: Number,
    longitude: Number
  }],
  
  // Status
  claimStatus: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'under-review'], 
    default: 'pending' 
  },
  applicationDate: Date,
  approvalDate: Date,
  
  // Management Plan
  conservationActivities: [String],
  annualIncome: Number,
  
  // OCR/NER Extracted Data
  extractedEntities: {
    persons: [String],
    locations: [String],
    dates: [String],
    numbers: [String],
    organizations: [String]
  },
  
  // Document References
  sourceDocument: {
    documentId: String,
    fileName: String,
    uploadedAt: Date,
    ocrConfidence: Number
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// FRA Atlas Entry (Aggregated View)
const FRAAtlasEntrySchema = new mongoose.Schema({
  entryId: { type: String, required: true, unique: true },
  entryType: { 
    type: String, 
    required: true, 
    enum: ['IFR', 'CFR', 'CR'] 
  },
  
  // Location Data
  state: { type: String, required: true, enum: ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'] },
  district: { type: String, required: true },
  tehsil: String,
  village: { type: String, required: true },
  
  // Geospatial (for WebGIS)
  geoData: {
    type: { type: String, enum: ['Point', 'Polygon'], default: 'Point' },
    coordinates: mongoose.Schema.Types.Mixed, // Can be point or polygon
    properties: {
      area: Number, // in acres or hectares
      claimStatus: String,
      beneficiaries: Number,
      pattaNumber: String
    }
  },
  
  // Link to detailed record
  referenceId: mongoose.Schema.Types.ObjectId,
  referenceModel: { type: String, enum: ['IFR', 'CFR'] },
  
  // Status & Metadata
  claimStatus: String,
  submittedDate: Date,
  approvedDate: Date,
  lastUpdated: { type: Date, default: Date.now },
  
  // For DSS Integration
  eligibilityFlags: {
    pmKisan: { type: Boolean, default: false },
    jalJeevanMission: { type: Boolean, default: false },
    mgnrega: { type: Boolean, default: false },
    dajgua: { type: Boolean, default: false }
  }
});

// Add indexes for efficient querying
IFRSchema.index({ state: 1, district: 1, village: 1 });
IFRSchema.index({ claimStatus: 1 });
IFRSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });

CFRSchema.index({ state: 1, district: 1, village: 1 });
CFRSchema.index({ claimStatus: 1 });

FRAAtlasEntrySchema.index({ state: 1, district: 1, village: 1 });
FRAAtlasEntrySchema.index({ entryType: 1, claimStatus: 1 });
FRAAtlasEntrySchema.index({ 'geoData.coordinates': '2dsphere' }); // Geospatial index

// Export models
module.exports = {
  IFR: mongoose.model('IFR', IFRSchema),
  CFR: mongoose.model('CFR', CFRSchema),
  FRAAtlasEntry: mongoose.model('FRAAtlasEntry', FRAAtlasEntrySchema)
};
