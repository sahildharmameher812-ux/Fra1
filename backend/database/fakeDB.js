/**
 * Fake In-Memory Database for FRA Atlas
 * Stores FRA records without requiring MongoDB
 */

class FakeDatabase {
  constructor() {
    // In-memory storage
    this.fraRecords = [];
    this.atlasEntries = [];
    this.counter = 1;
  }

  /**
   * Save FRA record
   */
  saveFRARecord(data) {
    const record = {
      _id: `FRA_${this.counter++}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.fraRecords.push(record);
    
    // Create atlas entry for mapping
    const atlasEntry = this.createAtlasEntry(record);
    this.atlasEntries.push(atlasEntry);
    
    return record;
  }

  /**
   * Create atlas entry for WebGIS
   */
  createAtlasEntry(record) {
    return {
      _id: `ATLAS_${this.counter}`,
      entryId: `ATLAS_${record.recordType}_${Date.now()}`,
      entryType: record.recordType,
      state: record.state,
      district: record.district,
      village: record.village,
      geoData: {
        type: 'Point',
        coordinates: [record.coordinates?.longitude || 0, record.coordinates?.latitude || 0],
        properties: {
          applicantName: record.applicantName,
          area: record.landArea || record.forestArea,
          claimStatus: record.claimStatus,
          pattaNumber: record.pattaNumber
        }
      },
      eligibleSchemes: record.eligibleSchemes || {},
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Get all FRA records
   */
  getAllRecords() {
    return this.fraRecords;
  }

  /**
   * Get records by state
   */
  getRecordsByState(state) {
    return this.fraRecords.filter(r => r.state === state);
  }

  /**
   * Get records by district
   */
  getRecordsByDistrict(district) {
    return this.fraRecords.filter(r => r.district === district);
  }

  /**
   * Get atlas entries for mapping
   */
  getAtlasEntries(filters = {}) {
    let entries = [...this.atlasEntries];
    
    if (filters.state) {
      entries = entries.filter(e => e.state === filters.state);
    }
    if (filters.district) {
      entries = entries.filter(e => e.district === filters.district);
    }
    if (filters.entryType) {
      entries = entries.filter(e => e.entryType === filters.entryType);
    }
    
    return entries;
  }

  /**
   * Get GeoJSON for mapping
   */
  getGeoJSON(filters = {}) {
    const entries = this.getAtlasEntries(filters);
    
    return {
      type: 'FeatureCollection',
      features: entries.map(entry => ({
        type: 'Feature',
        id: entry._id,
        geometry: {
          type: entry.geoData.type,
          coordinates: entry.geoData.coordinates
        },
        properties: {
          ...entry.geoData.properties,
          entryType: entry.entryType,
          state: entry.state,
          district: entry.district,
          village: entry.village,
          eligibleSchemes: entry.eligibleSchemes
        }
      }))
    };
  }

  /**
   * Get statistics
   */
  getStatistics() {
    const totalRecords = this.fraRecords.length;
    const ifrRecords = this.fraRecords.filter(r => r.recordType === 'IFR').length;
    const cfrRecords = this.fraRecords.filter(r => r.recordType === 'CFR').length;
    
    const byState = {};
    this.fraRecords.forEach(r => {
      byState[r.state] = (byState[r.state] || 0) + 1;
    });
    
    return {
      total: totalRecords,
      ifr: ifrRecords,
      cfr: cfrRecords,
      byState,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Clear all data (for testing)
   */
  clearAll() {
    this.fraRecords = [];
    this.atlasEntries = [];
    this.counter = 1;
  }
}

// Create singleton instance
const fakeDB = new FakeDatabase();

module.exports = fakeDB;
