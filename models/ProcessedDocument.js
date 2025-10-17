const mongoose = require('mongoose');

const processedDocumentSchema = new mongoose.Schema(
  {
    documentId: { type: String, required: true, index: true, unique: true },
    documentType: { type: String },

    file: {
      originalName: String,
      fileName: String,
      filePath: String,
      size: Number,
      mimeType: String,
      uploadedAt: { type: Date, default: Date.now },
      uploadedBy: String,
    },

    ocr: {
      completed: { type: Boolean, default: false },
      text: { type: String },
      confidence: { type: Number, min: 0, max: 1 },
      language: { type: String, default: 'eng' },
      engine: { type: String, default: 'tesseract.js' },
    },

    ner: {
      people: [String],
      organizations: [String],
      locations: [String],
      dates: [String],
      numbers: [String],
      emails: [String],
      phoneNumbers: [String],
      ids: {
        aadharNumbers: [String],
        panNumbers: [String],
      },
      extras: mongoose.Schema.Types.Mixed,
    },

    validation: {
      isValid: Boolean,
      errors: [String],
      warnings: [String],
      confidence: Number,
      dataQuality: {
        completeness: Number,
        accuracy: Number,
        consistency: Number,
      },
    },

    status: {
      type: String,
      enum: ['uploaded', 'processing', 'processed', 'needs_review', 'verified', 'rejected'],
      default: 'uploaded',
    },

    claimId: { type: String },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

processedDocumentSchema.index({ 'file.uploadedAt': -1 });

module.exports = mongoose.model('ProcessedDocument', processedDocumentSchema);