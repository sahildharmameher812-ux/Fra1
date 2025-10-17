// Data models and validation schemas for FRA system

/**
 * User/Applicant Model
 */
const ApplicantSchema = {
  personal: {
    name: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    fatherName: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    motherName: { type: 'string', required: false, minLength: 2, maxLength: 100 },
    dateOfBirth: { type: 'date', required: true },
    gender: { type: 'enum', values: ['male', 'female', 'other'], required: true },
    maritalStatus: { type: 'enum', values: ['single', 'married', 'divorced', 'widowed'] },
    aadharNumber: { type: 'string', required: true, pattern: /^\d{12}$/ },
    phoneNumber: { type: 'string', pattern: /^\+91[6-9]\d{9}$/ },
    email: { type: 'string', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    photographs: { type: 'array', items: { type: 'string' } }
  },
  
  tribal: {
    tribe: { type: 'string', required: true, maxLength: 100 },
    subTribe: { type: 'string', maxLength: 100 },
    tribalCertificateNumber: { type: 'string', required: true },
    issuingAuthority: { type: 'string', required: true },
    certificateDate: { type: 'date', required: true },
    category: { type: 'enum', values: ['ST', 'OTFD'], required: true }
  },
  
  residence: {
    currentAddress: {
      village: { type: 'string', required: true, maxLength: 100 },
      block: { type: 'string', required: true, maxLength: 100 },
      district: { type: 'string', required: true, maxLength: 100 },
      state: { type: 'string', required: true, maxLength: 100 },
      pincode: { type: 'string', pattern: /^\d{6}$/ }
    },
    permanentAddress: {
      same_as_current: { type: 'boolean', default: true },
      village: { type: 'string', maxLength: 100 },
      block: { type: 'string', maxLength: 100 },
      district: { type: 'string', maxLength: 100 },
      state: { type: 'string', maxLength: 100 },
      pincode: { type: 'string', pattern: /^\d{6}$/ }
    },
    residenceSince: { type: 'date', required: true },
    domicileCertificate: { type: 'string' }
  },
  
  family: {
    members: {
      type: 'array',
      items: {
        name: { type: 'string', required: true },
        relationship: { type: 'string', required: true },
        age: { type: 'number', min: 0, max: 120 },
        occupation: { type: 'string' },
        dependsOnForest: { type: 'boolean', default: true }
      }
    },
    totalMembers: { type: 'number', min: 1, max: 50 }
  },
  
  livelihood: {
    primaryOccupation: { type: 'string', required: true },
    secondaryOccupation: { type: 'string' },
    annualIncome: { type: 'number', min: 0 },
    forestDependency: {
      percentage: { type: 'number', min: 0, max: 100 },
      activities: { 
        type: 'array', 
        items: { 
          type: 'enum', 
          values: ['agriculture', 'grazing', 'ntfp_collection', 'hunting', 'fishing', 'honey_collection', 'other'] 
        }
      },
      ntfpTypes: { type: 'array', items: { type: 'string' } }
    }
  }
};

/**
 * Land Details Model
 */
const LandSchema = {
  survey: {
    surveyNumber: { type: 'string', required: true, maxLength: 50 },
    subDivision: { type: 'string', maxLength: 20 },
    area: { type: 'number', required: true, min: 0.01, max: 10 }, // in hectares
    landType: { type: 'enum', values: ['forest_land', 'revenue_land', 'other'], required: true },
    classification: { type: 'string', maxLength: 100 }
  },
  
  location: {
    coordinates: {
      latitude: { type: 'number', min: -90, max: 90, required: true },
      longitude: { type: 'number', min: -180, max: 180, required: true }
    },
    boundaries: {
      north: { type: 'string', required: true },
      south: { type: 'string', required: true },
      east: { type: 'string', required: true },
      west: { type: 'string', required: true }
    },
    landmarks: { type: 'array', items: { type: 'string' } },
    accessibility: { type: 'enum', values: ['easy', 'moderate', 'difficult'] }
  },
  
  occupation: {
    since: { type: 'date', required: true },
    occupationType: { type: 'enum', values: ['continuous', 'seasonal', 'periodic'], required: true },
    evidence: { type: 'array', items: { type: 'string' } },
    witnesses: {
      type: 'array',
      minItems: 2,
      maxItems: 5,
      items: {
        name: { type: 'string', required: true },
        relationship: { type: 'string', required: true },
        address: { type: 'string', required: true },
        contactNumber: { type: 'string' }
      }
    }
  },
  
  usage: {
    currentUse: { type: 'array', items: { type: 'string' } },
    cropsGrown: { type: 'array', items: { type: 'string' } },
    livestock: {
      type: { type: 'array', items: { type: 'string' } },
      count: { type: 'number', min: 0 }
    },
    structures: {
      dwelling: { type: 'boolean', default: false },
      agricultural: { type: 'boolean', default: false },
      other: { type: 'array', items: { type: 'string' } }
    }
  },
  
  disputes: {
    hasDisputes: { type: 'boolean', default: false },
    disputeDetails: { type: 'string' },
    litigation: {
      pending: { type: 'boolean', default: false },
      caseNumber: { type: 'string' },
      court: { type: 'string' },
      status: { type: 'string' }
    }
  }
};

/**
 * Document Model
 */
const DocumentSchema = {
  documentId: { type: 'string', required: true },
  type: { 
    type: 'enum', 
    values: ['identity-proof', 'tribal-certificate', 'land-documents', 'residence-proof', 'bank-details', 'other'],
    required: true 
  },
  subType: { type: 'string' },
  originalName: { type: 'string', required: true },
  fileName: { type: 'string', required: true },
  filePath: { type: 'string', required: true },
  fileSize: { type: 'number', required: true },
  mimeType: { type: 'string', required: true },
  uploadedAt: { type: 'date', required: true },
  uploadedBy: { type: 'string', required: true },
  
  processing: {
    status: { 
      type: 'enum', 
      values: ['uploaded', 'processing', 'processed', 'verified', 'rejected'],
      default: 'uploaded'
    },
    ocrCompleted: { type: 'boolean', default: false },
    extractedText: { type: 'string' },
    extractedFields: { type: 'object' },
    confidence: { type: 'number', min: 0, max: 1 },
    processingErrors: { type: 'array', items: { type: 'string' } }
  },
  
  verification: {
    verifiedBy: { type: 'string' },
    verifiedAt: { type: 'date' },
    status: { type: 'enum', values: ['pending', 'approved', 'rejected', 'needs_correction'] },
    comments: { type: 'string' },
    corrections: { type: 'array', items: { type: 'string' } }
  },
  
  metadata: {
    tags: { type: 'array', items: { type: 'string' } },
    description: { type: 'string' },
    isPublic: { type: 'boolean', default: false },
    retentionPeriod: { type: 'number' }, // in days
    accessLog: {
      type: 'array',
      items: {
        userId: { type: 'string' },
        accessedAt: { type: 'date' },
        action: { type: 'string' }
      }
    }
  }
};

/**
 * Claim Model
 */
const ClaimSchema = {
  claimId: { type: 'string', required: true },
  applicant: { type: 'object', schema: ApplicantSchema, required: true },
  landDetails: { type: 'object', schema: LandSchema, required: true },
  documents: { type: 'array', items: { type: 'string' } }, // Document IDs
  
  application: {
    submittedAt: { type: 'date', required: true },
    submittedBy: { type: 'string', required: true },
    applicationNumber: { type: 'string', required: true },
    gramSabhaResolution: {
      number: { type: 'string', required: true },
      date: { type: 'date', required: true },
      supportingMembers: { type: 'number', min: 0 },
      opposingMembers: { type: 'number', min: 0 }
    }
  },
  
  processing: {
    currentStatus: { 
      type: 'enum',
      values: ['draft', 'submitted', 'under_review', 'document_verification', 'field_survey_required', 
               'field_survey_completed', 'committee_review', 'approved', 'rejected', 'title_issued', 'completed'],
      default: 'draft'
    },
    priority: { type: 'enum', values: ['low', 'normal', 'high', 'urgent'], default: 'normal' },
    assignedOfficer: { type: 'string' },
    processingDays: { type: 'number', min: 0 },
    lastUpdated: { type: 'date', required: true },
    estimatedCompletion: { type: 'date' }
  },
  
  timeline: {
    type: 'array',
    items: {
      status: { type: 'string', required: true },
      date: { type: 'date', required: true },
      officer: { type: 'string', required: true },
      notes: { type: 'string' },
      documents: { type: 'array', items: { type: 'string' } },
      duration: { type: 'number' } // time spent in this status (hours)
    }
  },
  
  verification: {
    sdlc: {
      status: { type: 'enum', values: ['pending', 'in_progress', 'completed', 'rejected'] },
      verifiedBy: { type: 'string' },
      verificationDate: { type: 'date' },
      findings: { type: 'string' },
      recommendations: { type: 'string' },
      issues: { type: 'array', items: { type: 'string' } }
    },
    dlc: {
      status: { type: 'enum', values: ['pending', 'in_progress', 'completed', 'rejected'] },
      reviewDate: { type: 'date' },
      decision: { type: 'string' },
      conditions: { type: 'array', items: { type: 'string' } },
      approvalNumber: { type: 'string' }
    },
    fieldSurvey: {
      scheduled: { type: 'boolean', default: false },
      scheduledDate: { type: 'date' },
      surveyorId: { type: 'string' },
      completedDate: { type: 'date' },
      report: { type: 'object' },
      measurements: { type: 'object' },
      photographs: { type: 'array', items: { type: 'string' } }
    }
  },
  
  decision: {
    finalStatus: { type: 'enum', values: ['approved', 'rejected', 'partial', 'conditional'] },
    approvedArea: { type: 'number', min: 0 },
    conditions: { type: 'array', items: { type: 'string' } },
    rejectionReasons: { type: 'array', items: { type: 'string' } },
    appealable: { type: 'boolean', default: true },
    appealDeadline: { type: 'date' }
  },
  
  notifications: {
    type: 'array',
    items: {
      type: { type: 'string', required: true },
      message: { type: 'string', required: true },
      sentAt: { type: 'date', required: true },
      sentTo: { type: 'array', items: { type: 'string' } },
      delivered: { type: 'boolean', default: false },
      readAt: { type: 'date' }
    }
  },
  
  compliance: {
    fraCompliant: { type: 'boolean' },
    stateCompliant: { type: 'boolean' },
    environmentalClearance: { type: 'boolean' },
    complianceNotes: { type: 'string' },
    violations: { type: 'array', items: { type: 'string' } }
  }
};

/**
 * Analytics/Metrics Model
 */
const AnalyticsSchema = {
  reportId: { type: 'string', required: true },
  type: { type: 'string', required: true },
  generatedAt: { type: 'date', required: true },
  generatedBy: { type: 'string', required: true },
  
  timeframe: {
    startDate: { type: 'date', required: true },
    endDate: { type: 'date', required: true },
    period: { type: 'string', required: true }
  },
  
  filters: {
    state: { type: 'array', items: { type: 'string' } },
    district: { type: 'array', items: { type: 'string' } },
    status: { type: 'array', items: { type: 'string' } },
    priority: { type: 'array', items: { type: 'string' } }
  },
  
  metrics: {
    totalClaims: { type: 'number', min: 0 },
    approvedClaims: { type: 'number', min: 0 },
    rejectedClaims: { type: 'number', min: 0 },
    pendingClaims: { type: 'number', min: 0 },
    averageProcessingTime: { type: 'number', min: 0 },
    approvalRate: { type: 'number', min: 0, max: 100 },
    systemEfficiency: { type: 'number', min: 0, max: 100 }
  },
  
  trends: {
    direction: { type: 'enum', values: ['increasing', 'decreasing', 'stable'] },
    strength: { type: 'number', min: 0, max: 1 },
    significance: { type: 'number', min: 0, max: 1 },
    forecast: { type: 'array', items: { type: 'object' } }
  },
  
  insights: { type: 'array', items: { type: 'string' } },
  recommendations: { type: 'array', items: { type: 'string' } },
  
  exportUrls: {
    pdf: { type: 'string' },
    excel: { type: 'string' },
    csv: { type: 'string' }
  }
};

/**
 * Validation Functions
 */
const validateSchema = (data, schema) => {
  const errors = [];
  
  const validateField = (fieldPath, value, fieldSchema, parentData = null) => {
    // Handle null/undefined values
    if (value === null || value === undefined) {
      if (fieldSchema.required) {
        errors.push(`${fieldPath} is required`);
      }
      return;
    }
    
    // Type validation
    switch (fieldSchema.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push(`${fieldPath} must be a string`);
          return;
        }
        
        if (fieldSchema.minLength && value.length < fieldSchema.minLength) {
          errors.push(`${fieldPath} must be at least ${fieldSchema.minLength} characters`);
        }
        if (fieldSchema.maxLength && value.length > fieldSchema.maxLength) {
          errors.push(`${fieldPath} must be at most ${fieldSchema.maxLength} characters`);
        }
        if (fieldSchema.pattern && !fieldSchema.pattern.test(value)) {
          errors.push(`${fieldPath} format is invalid`);
        }
        break;
        
      case 'number':
        if (typeof value !== 'number' || isNaN(value)) {
          errors.push(`${fieldPath} must be a valid number`);
          return;
        }
        
        if (fieldSchema.min !== undefined && value < fieldSchema.min) {
          errors.push(`${fieldPath} must be at least ${fieldSchema.min}`);
        }
        if (fieldSchema.max !== undefined && value > fieldSchema.max) {
          errors.push(`${fieldPath} must be at most ${fieldSchema.max}`);
        }
        break;
        
      case 'date':
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          errors.push(`${fieldPath} must be a valid date`);
          return;
        }
        
        if (fieldSchema.minDate && date < new Date(fieldSchema.minDate)) {
          errors.push(`${fieldPath} must be after ${fieldSchema.minDate}`);
        }
        if (fieldSchema.maxDate && date > new Date(fieldSchema.maxDate)) {
          errors.push(`${fieldPath} must be before ${fieldSchema.maxDate}`);
        }
        break;
        
      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push(`${fieldPath} must be a boolean`);
        }
        break;
        
      case 'enum':
        if (!fieldSchema.values.includes(value)) {
          errors.push(`${fieldPath} must be one of: ${fieldSchema.values.join(', ')}`);
        }
        break;
        
      case 'array':
        if (!Array.isArray(value)) {
          errors.push(`${fieldPath} must be an array`);
          return;
        }
        
        if (fieldSchema.minItems && value.length < fieldSchema.minItems) {
          errors.push(`${fieldPath} must have at least ${fieldSchema.minItems} items`);
        }
        if (fieldSchema.maxItems && value.length > fieldSchema.maxItems) {
          errors.push(`${fieldPath} must have at most ${fieldSchema.maxItems} items`);
        }
        
        if (fieldSchema.items) {
          value.forEach((item, index) => {
            validateField(`${fieldPath}[${index}]`, item, fieldSchema.items, value);
          });
        }
        break;
        
      case 'object':
        if (typeof value !== 'object' || Array.isArray(value)) {
          errors.push(`${fieldPath} must be an object`);
          return;
        }
        
        if (fieldSchema.schema) {
          const nestedErrors = validateSchema(value, fieldSchema.schema);
          nestedErrors.forEach(error => {
            errors.push(`${fieldPath}.${error}`);
          });
        }
        break;
    }
  };
  
  const validateObject = (obj, schema, path = '') => {
    for (const [key, fieldSchema] of Object.entries(schema)) {
      const fieldPath = path ? `${path}.${key}` : key;
      const value = obj[key];
      
      if (typeof fieldSchema === 'object' && !fieldSchema.type) {
        // Nested object
        if (value !== null && value !== undefined) {
          validateObject(value, fieldSchema, fieldPath);
        } else if (fieldSchema.required) {
          errors.push(`${fieldPath} is required`);
        }
      } else {
        validateField(fieldPath, value, fieldSchema, obj);
      }
    }
  };
  
  validateObject(data, schema);
  
  return errors;
};

/**
 * Data transformation utilities
 */
const transformData = {
  /**
   * Sanitize user input
   */
  sanitizeInput: (data) => {
    if (typeof data === 'string') {
      return data.trim().replace(/[<>]/g, '');
    }
    
    if (typeof data === 'object' && data !== null) {
      const sanitized = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = transformData.sanitizeInput(value);
      }
      return sanitized;
    }
    
    return data;
  },
  
  /**
   * Format dates consistently
   */
  formatDate: (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
  },
  
  /**
   * Normalize phone numbers
   */
  normalizePhone: (phone) => {
    if (!phone) return null;
    
    let normalized = phone.replace(/[^0-9+]/g, '');
    
    if (normalized.startsWith('91') && normalized.length === 12) {
      normalized = '+' + normalized;
    } else if (normalized.startsWith('0') && normalized.length === 11) {
      normalized = '+91' + normalized.substring(1);
    } else if (normalized.length === 10) {
      normalized = '+91' + normalized;
    }
    
    return normalized;
  },
  
  /**
   * Generate unique IDs
   */
  generateId: (prefix = 'ID') => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `${prefix}_${timestamp}_${random}`.toUpperCase();
  },
  
  /**
   * Convert coordinates to standard format
   */
  normalizeCoordinates: (lat, lon) => {
    return {
      latitude: parseFloat(lat).toFixed(6),
      longitude: parseFloat(lon).toFixed(6)
    };
  }
};

/**
 * Export all models and utilities
 */
module.exports = {
  schemas: {
    ApplicantSchema,
    LandSchema,
    DocumentSchema,
    ClaimSchema,
    AnalyticsSchema
  },
  
  validation: {
    validateSchema,
    validateApplicant: (data) => validateSchema(data, ApplicantSchema),
    validateLand: (data) => validateSchema(data, LandSchema),
    validateDocument: (data) => validateSchema(data, DocumentSchema),
    validateClaim: (data) => validateSchema(data, ClaimSchema),
    validateAnalytics: (data) => validateSchema(data, AnalyticsSchema)
  },
  
  transform: transformData,
  
  constants: {
    CLAIM_STATUSES: [
      'draft', 'submitted', 'under_review', 'document_verification', 
      'field_survey_required', 'field_survey_completed', 'committee_review', 
      'approved', 'rejected', 'title_issued', 'completed'
    ],
    
    DOCUMENT_TYPES: [
      'identity-proof', 'tribal-certificate', 'land-documents', 
      'residence-proof', 'bank-details', 'other'
    ],
    
    PROCESSING_PRIORITIES: ['low', 'normal', 'high', 'urgent'],
    
    USER_ROLES: ['applicant', 'officer', 'surveyor', 'committee_member', 'admin'],
    
    LAND_TYPES: ['forest_land', 'revenue_land', 'other'],
    
    TRIBAL_CATEGORIES: ['ST', 'OTFD']
  }
};
