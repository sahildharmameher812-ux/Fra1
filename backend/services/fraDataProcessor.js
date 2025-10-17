const { IFR, CFR, FRAAtlasEntry } = require('../models/FRADocument');

/**
 * FRA Data Processor
 * Transforms raw OCR/NER output into structured FRA Atlas database entries
 */

class FRADataProcessor {
  /**
   * Process OCR/NER result and create structured database entry
   * @param {Object} ocrResult - Raw OCR result with extracted text and NER entities
   * @param {Object} metadata - Document metadata
   * @returns {Promise<Object>} - Created database entry
   */
  async processDocument(ocrResult, metadata) {
    try {
      const documentType = this.identifyDocumentType(ocrResult.extractedText);
      
      if (documentType === 'IFR') {
        return await this.processIFRDocument(ocrResult, metadata);
      } else if (documentType === 'CFR') {
        return await this.processCFRDocument(ocrResult, metadata);
      } else {
        throw new Error('Unable to identify document type');
      }
    } catch (error) {
      console.error('Error processing FRA document:', error);
      throw error;
    }
  }

  /**
   * Identify document type from extracted text
   */
  identifyDocumentType(text) {
    const textLower = text.toLowerCase();
    
    if (textLower.includes('individual forest rights') || 
        textLower.includes('ifr') ||
        textLower.includes('व्यक्तिगत वन अधिकार')) {
      return 'IFR';
    } else if (textLower.includes('community forest') || 
               textLower.includes('cfr') ||
               textLower.includes('सामुदायिक वन')) {
      return 'CFR';
    }
    
    return 'IFR'; // Default to IFR
  }

  /**
   * Process Individual Forest Rights (IFR) document
   */
  async processIFRDocument(ocrResult, metadata) {
    const extracted = this.extractIFRFields(ocrResult);
    
    const ifrData = {
      applicationNumber: extracted.applicationNumber || `IFR/${extracted.state}/${Date.now()}`,
      applicantName: extracted.applicantName,
      fatherName: extracted.fatherName,
      aadharNumber: extracted.aadharNumber,
      village: extracted.village,
      tehsil: extracted.tehsil,
      district: extracted.district,
      state: extracted.state,
      
      // Land details
      landArea: extracted.landArea,
      surveyNumber: extracted.surveyNumber,
      forestBlock: extracted.forestBlock,
      
      // Geospatial
      coordinates: {
        latitude: extracted.latitude,
        longitude: extracted.longitude,
        type: 'Point'
      },
      
      // Status
      claimStatus: extracted.claimStatus || 'under-review',
      applicationDate: extracted.applicationDate,
      approvalDate: extracted.approvalDate,
      pattaNumber: extracted.pattaNumber,
      
      // OCR/NER data
      extractedEntities: ocrResult.ner || {},
      
      // Source document
      sourceDocument: {
        documentId: metadata.documentId,
        fileName: metadata.fileName,
        uploadedAt: new Date(),
        ocrConfidence: ocrResult.confidence
      },
      
      // Family details
      familyMembers: extracted.familyMembers,
      tribe: extracted.tribe,
      stCertificateNumber: extracted.stCertificateNumber
    };

    // Save to database
    const ifrRecord = new IFR(ifrData);
    await ifrRecord.save();
    
    // Create FRA Atlas entry
    await this.createAtlasEntry(ifrRecord, 'IFR');
    
    return {
      success: true,
      recordType: 'IFR',
      recordId: ifrRecord._id,
      data: ifrRecord
    };
  }

  /**
   * Process Community Forest Resource (CFR) document
   */
  async processCFRDocument(ocrResult, metadata) {
    const extracted = this.extractCFRFields(ocrResult);
    
    const cfrData = {
      applicationNumber: extracted.applicationNumber || `CFR/${extracted.state}/${Date.now()}`,
      gramSabhaName: extracted.gramSabhaName,
      panchayat: extracted.panchayat,
      village: extracted.village,
      tehsil: extracted.tehsil,
      district: extracted.district,
      state: extracted.state,
      
      // Forest area details
      forestArea: extracted.forestArea,
      forestDepartmentRecordNo: extracted.forestDepartmentRecordNo,
      forestType: extracted.forestType,
      forestDensity: extracted.forestDensity,
      
      // Community details
      totalPopulation: extracted.totalPopulation,
      totalFamilies: extracted.totalFamilies,
      stFamilies: extracted.stFamilies,
      
      // Boundaries
      boundaries: extracted.boundaries,
      
      // Geospatial
      polygonCoordinates: extracted.polygonCoordinates,
      
      // Status
      claimStatus: extracted.claimStatus || 'under-review',
      applicationDate: extracted.applicationDate,
      approvalDate: extracted.approvalDate,
      
      // Management
      conservationActivities: extracted.conservationActivities,
      annualIncome: extracted.annualIncome,
      
      // OCR/NER data
      extractedEntities: ocrResult.ner || {},
      
      // Source document
      sourceDocument: {
        documentId: metadata.documentId,
        fileName: metadata.fileName,
        uploadedAt: new Date(),
        ocrConfidence: ocrResult.confidence
      }
    };

    // Save to database
    const cfrRecord = new CFR(cfrData);
    await cfrRecord.save();
    
    // Create FRA Atlas entry
    await this.createAtlasEntry(cfrRecord, 'CFR');
    
    return {
      success: true,
      recordType: 'CFR',
      recordId: cfrRecord._id,
      data: cfrRecord
    };
  }

  /**
   * Extract fields from IFR document
   */
  extractIFRFields(ocrResult) {
    const text = ocrResult.extractedText;
    const ner = ocrResult.ner || {};
    
    return {
      applicationNumber: this.extractPattern(text, /application\s*(?:no|number)[:\s]*([A-Z0-9\/\-]+)/i) ||
                        this.extractPattern(text, /आवेदन\s*संख्या[:\s]*([A-Z0-9\/\-]+)/i),
      
      applicantName: ner.persons?.[0] || this.extractPattern(text, /(?:applicant|name)[:\s]*([A-Za-z\s]+)/i),
      
      fatherName: ner.persons?.[1] || this.extractPattern(text, /father['\s]*(?:s\s*)?name[:\s]*([A-Za-z\s]+)/i),
      
      aadharNumber: this.extractPattern(text, /aadhar[:\s]*(\d{4}\s*\d{4}\s*\d{4})/i) ||
                    this.extractPattern(text, /आधार[:\s]*(\d{4}\s*\d{4}\s*\d{4})/i),
      
      village: ner.locations?.[0] || this.extractPattern(text, /village[:\s]*([A-Za-z\s]+)/i),
      
      tehsil: this.extractPattern(text, /tehsil[:\s]*([A-Za-z\s]+)/i),
      
      district: ner.locations?.[1] || this.extractPattern(text, /district[:\s]*([A-Za-z\s]+)/i),
      
      state: this.identifyState(text),
      
      landArea: parseFloat(this.extractPattern(text, /area[:\s]*(\d+\.?\d*)\s*(?:acres|एकड़)/i)) || 0,
      
      surveyNumber: this.extractPattern(text, /survey\s*(?:no|number)[:\s]*([0-9\/\-]+)/i) ||
                    this.extractPattern(text, /खसरा[:\s]*([0-9\/\-]+)/i),
      
      forestBlock: this.extractPattern(text, /forest\s*(?:block|range)[:\s]*([A-Z0-9\-]+)/i),
      
      latitude: parseFloat(this.extractPattern(text, /latitude[:\s]*(\d+\.?\d*)/i)),
      longitude: parseFloat(this.extractPattern(text, /longitude[:\s]*(\d+\.?\d*)/i)),
      
      applicationDate: this.extractDate(text),
      
      tribe: this.extractPattern(text, /tribe[:\s]*([A-Za-z\s]+)/i) ||
             this.extractPattern(text, /जनजाति[:\s]*([A-Za-z\s]+)/i),
      
      familyMembers: parseInt(this.extractPattern(text, /(?:total\s*)?members[:\s]*(\d+)/i)) || 0,
      
      stCertificateNumber: this.extractPattern(text, /st\s*certificate[:\s]*([A-Z0-9\/\-]+)/i)
    };
  }

  /**
   * Extract fields from CFR document
   */
  extractCFRFields(ocrResult) {
    const text = ocrResult.extractedText;
    const ner = ocrResult.ner || {};
    
    return {
      applicationNumber: this.extractPattern(text, /application\s*(?:no|number)[:\s]*([A-Z0-9\/\-]+)/i),
      
      gramSabhaName: ner.locations?.[0] || this.extractPattern(text, /gram\s*sabha[:\s]*([A-Za-z\s]+)/i),
      
      panchayat: this.extractPattern(text, /panchayat[:\s]*([A-Za-z\s]+)/i),
      
      village: ner.locations?.[1] || this.extractPattern(text, /village[:\s]*([A-Za-z\s]+)/i),
      
      tehsil: this.extractPattern(text, /tehsil[:\s]*([A-Za-z\s]+)/i),
      
      district: ner.locations?.[2] || this.extractPattern(text, /district[:\s]*([A-Za-z\s]+)/i),
      
      state: this.identifyState(text),
      
      forestArea: parseFloat(this.extractPattern(text, /(?:forest\s*)?area[:\s]*(\d+\.?\d*)\s*(?:hectares|हेक्टेयर)/i)) || 0,
      
      forestDepartmentRecordNo: this.extractPattern(text, /forest\s*(?:dept|department)\s*record[:\s]*([A-Z0-9\/\-]+)/i),
      
      forestType: this.extractPattern(text, /forest\s*type[:\s]*([A-Za-z\s]+)/i),
      
      totalPopulation: parseInt(this.extractPattern(text, /population[:\s]*(\d+)/i)) || 0,
      
      totalFamilies: parseInt(this.extractPattern(text, /(?:total\s*)?families[:\s]*(\d+)/i)) || 0,
      
      stFamilies: parseInt(this.extractPattern(text, /st\s*families[:\s]*(\d+)/i)) || 0,
      
      applicationDate: this.extractDate(text),
      
      annualIncome: parseFloat(this.extractPattern(text, /annual\s*income[:\s]*₹?(\d+)/i)) || 0,
      
      boundaries: {
        north: this.extractPattern(text, /north[:\s]*([A-Za-z\s]+)/i),
        south: this.extractPattern(text, /south[:\s]*([A-Za-z\s]+)/i),
        east: this.extractPattern(text, /east[:\s]*([A-Za-z\s]+)/i),
        west: this.extractPattern(text, /west[:\s]*([A-Za-z\s]+)/i)
      }
    };
  }

  /**
   * Create FRA Atlas entry for WebGIS
   */
  async createAtlasEntry(record, type) {
    const atlasEntry = new FRAAtlasEntry({
      entryId: `ATLAS_${type}_${Date.now()}`,
      entryType: type,
      state: record.state,
      district: record.district,
      tehsil: record.tehsil,
      village: record.village,
      geoData: {
        type: type === 'IFR' ? 'Point' : 'Polygon',
        coordinates: type === 'IFR' ? 
          [record.coordinates.longitude, record.coordinates.latitude] : 
          record.polygonCoordinates,
        properties: {
          area: type === 'IFR' ? record.landArea : record.forestArea,
          claimStatus: record.claimStatus,
          beneficiaries: type === 'IFR' ? record.familyMembers : record.totalFamilies,
          pattaNumber: record.pattaNumber
        }
      },
      referenceId: record._id,
      referenceModel: type,
      claimStatus: record.claimStatus,
      submittedDate: record.applicationDate,
      approvedDate: record.approvalDate,
      eligibilityFlags: this.calculateEligibility(record, type)
    });
    
    await atlasEntry.save();
    return atlasEntry;
  }

  /**
   * Calculate eligibility for CSS schemes (for DSS)
   */
  calculateEligibility(record, type) {
    return {
      pmKisan: type === 'IFR' && record.claimStatus === 'approved' && record.landArea > 0,
      jalJeevanMission: record.claimStatus === 'approved',
      mgnrega: record.claimStatus === 'approved',
      dajgua: record.claimStatus === 'approved'
    };
  }

  /**
   * Helper: Extract pattern from text
   */
  extractPattern(text, pattern) {
    const match = text.match(pattern);
    return match ? match[1].trim() : null;
  }

  /**
   * Helper: Identify state from text
   */
  identifyState(text) {
    const textLower = text.toLowerCase();
    if (textLower.includes('madhya pradesh') || textLower.includes('मध्य प्रदेश')) return 'Madhya Pradesh';
    if (textLower.includes('tripura') || textLower.includes('त्रिपुरा')) return 'Tripura';
    if (textLower.includes('odisha') || textLower.includes('ओडिशा')) return 'Odisha';
    if (textLower.includes('telangana') || textLower.includes('तेलंगाना')) return 'Telangana';
    return 'Madhya Pradesh'; // Default
  }

  /**
   * Helper: Extract date from text
   */
  extractDate(text) {
    const datePatterns = [
      /(\d{2}[-\/]\d{2}[-\/]\d{4})/,
      /(\d{4}[-\/]\d{2}[-\/]\d{2})/,
      /(\d{1,2}\s+[A-Za-z]+\s+\d{4})/
    ];
    
    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        return new Date(match[1]);
      }
    }
    return new Date();
  }
}

module.exports = new FRADataProcessor();
