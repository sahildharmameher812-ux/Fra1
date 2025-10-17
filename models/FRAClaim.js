const mongoose = require('mongoose');

const fraClaimSchema = new mongoose.Schema({
  claimId: {
    type: String,
    required: true,
    unique: true
  },
  claimType: {
    type: String,
    enum: ['IFR', 'CR', 'CFR'], // Individual Forest Rights, Community Rights, Community Forest Resources
    required: true
  },
  claimantName: {
    type: String,
    required: true,
    trim: true
  },
  tribalGroup: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    enum: ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'],
    required: true
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  block: {
    type: String,
    required: true,
    trim: true
  },
  village: {
    type: String,
    required: true,
    trim: true
  },
  surveyNumber: {
    type: String,
    trim: true
  },
  forestCompartmentNumber: {
    type: String,
    trim: true
  },
  landArea: {
    hectares: {
      type: Number,
      required: true,
      min: 0
    },
    acres: {
      type: Number,
      min: 0
    }
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point', 'Polygon'],
      default: 'Polygon'
    },
    coordinates: {
      type: [[Number]], // For Polygon
      required: true
    }
  },
  boundaryDetails: {
    north: String,
    south: String,
    east: String,
    west: String
  },
  claimStatus: {
    type: String,
    enum: ['submitted', 'under_verification', 'field_verification', 'approved', 'rejected', 'pending_documents'],
    default: 'submitted'
  },
  submissionDate: {
    type: Date,
    required: true
  },
  verificationDate: {
    type: Date
  },
  approvalDate: {
    type: Date
  },
  rejectionReason: {
    type: String,
    trim: true
  },
  documents: [{
    documentType: {
      type: String,
      enum: ['application_form', 'identity_proof', 'residence_proof', 'possession_proof', 'community_certificate', 'other']
    },
    fileName: String,
    filePath: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    ocrProcessed: {
      type: Boolean,
      default: false
    },
    extractedData: {
      type: mongoose.Schema.Types.Mixed
    }
  }],
  landUseDetails: {
    agricultural: {
      type: Number,
      default: 0
    },
    residential: {
      type: Number,
      default: 0
    },
    community: {
      type: Number,
      default: 0
    },
    forest: {
      type: Number,
      default: 0
    }
  },
  familyDetails: {
    headOfFamily: String,
    totalMembers: Number,
    adultMembers: Number,
    minorMembers: Number,
    occupation: String
  },
  verificationOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvalOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  schemeEligibility: [{
    schemeName: {
      type: String,
      enum: ['PM-KISAN', 'Jal Jeevan Mission', 'MGNREGA', 'DAJGUA', 'Pradhan Mantri Awas Yojana', 'Other']
    },
    eligible: Boolean,
    enrollmentStatus: {
      type: String,
      enum: ['not_enrolled', 'enrolled', 'benefits_received'],
      default: 'not_enrolled'
    },
    enrollmentDate: Date,
    benefitAmount: Number
  }],
  gpsVerification: {
    verified: {
      type: Boolean,
      default: false
    },
    verificationDate: Date,
    accuracy: Number // in meters
  },
  satelliteAnalysis: {
    landCoverType: String,
    vegetationIndex: Number,
    changeDetection: {
      hasChanged: Boolean,
      changeType: String,
      changeDate: Date
    },
    lastAnalyzed: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for efficient querying
fraClaimSchema.index({ state: 1, district: 1, village: 1 });
fraClaimSchema.index({ claimStatus: 1 });
fraClaimSchema.index({ claimType: 1 });
fraClaimSchema.index({ coordinates: '2dsphere' });
fraClaimSchema.index({ submissionDate: -1 });

// Generate claim ID
fraClaimSchema.pre('save', function(next) {
  if (!this.claimId) {
    const stateCode = {
      'Madhya Pradesh': 'MP',
      'Tripura': 'TR',
      'Odisha': 'OD',
      'Telangana': 'TG'
    };
    
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.claimId = `FRA-${stateCode[this.state]}-${year}-${random}`;
  }
  next();
});

module.exports = mongoose.model('FRAClaim', fraClaimSchema);
