const express = require('express');
const router = express.Router();

// Simple auth middleware
const simpleAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  next();
};

// Claim status workflow
const CLAIM_STATUS_WORKFLOW = {
  'draft': ['submitted'],
  'submitted': ['under_review', 'rejected'],
  'under_review': ['document_verification', 'field_survey_required', 'rejected'],
  'document_verification': ['field_survey_required', 'committee_review', 'rejected'],
  'field_survey_required': ['field_survey_completed', 'rejected'],
  'field_survey_completed': ['committee_review', 'rejected'],
  'committee_review': ['approved', 'rejected', 'additional_info_required'],
  'additional_info_required': ['committee_review', 'rejected'],
  'approved': ['title_issued'],
  'title_issued': ['completed'],
  'rejected': [],
  'completed': []
};

// Mock data for comprehensive claim management
const mockClaimData = {
  claims: [
    {
      claimId: 'FRA-2024-001234',
      applicant: {
        name: 'Ramesh Kumar Tribal',
        fatherName: 'Mohan Lal Tribal',
        aadharNumber: '123456789012',
        mobileNumber: '+91-9876543210',
        email: 'ramesh.tribal@email.com',
        tribe: 'Gond',
        address: 'Village Jharia, Block Bhopal, District Bhopal'
      },
      landDetails: {
        surveyNumber: '245/3',
        area: 2.45,
        landType: 'Forest Land',
        coordinates: [78.9629, 22.5937],
        boundaries: 'North: River, South: Village Road, East: Forest, West: Agricultural Land',
        occupation: 'Traditional Agriculture and Forest Collection',
        occupationPeriod: '25 years'
      },
      status: 'committee_review',
      priority: 'high',
      submittedAt: '2024-01-15T10:30:00Z',
      lastUpdated: '2024-03-15T14:20:00Z',
      processingDays: 45,
      assignedOfficer: 'officer_bhopal_001',
      documents: ['DOC_1234_ID', 'DOC_1234_LAND', 'DOC_1234_TRIBAL'],
      timeline: [
        { status: 'submitted', date: '2024-01-15T10:30:00Z', officer: 'system', notes: 'Application submitted online' },
        { status: 'under_review', date: '2024-01-16T09:15:00Z', officer: 'officer_bhopal_001', notes: 'Initial review started' },
        { status: 'document_verification', date: '2024-01-20T11:45:00Z', officer: 'officer_bhopal_001', notes: 'Documents verified successfully' },
        { status: 'field_survey_completed', date: '2024-02-10T16:00:00Z', officer: 'surveyor_001', notes: 'Field survey completed, area confirmed' },
        { status: 'committee_review', date: '2024-03-01T10:00:00Z', officer: 'committee_chair', notes: 'Submitted to committee for final review' }
      ],
      surveyReport: {
        surveyorId: 'surveyor_001',
        surveyDate: '2024-02-08T09:00:00Z',
        findings: {
          areaConfirmed: true,
          measuredArea: 2.43,
          boundariesClear: true,
          occupationEvidence: true,
          environmentalClearance: true
        },
        recommendations: 'Recommend approval - all criteria satisfied'
      },
      notifications: [
        { type: 'status_update', message: 'Your claim is now under committee review', sent: '2024-03-01T10:15:00Z' },
        { type: 'document_request', message: 'Additional residence proof required', sent: '2024-01-25T14:30:00Z', resolved: true }
      ]
    }
  ]
};

// Create new claim
router.post('/create', simpleAuth, async (req, res) => {
  try {
    const {
      applicantDetails,
      landDetails,
      documents,
      priority = 'normal'
    } = req.body;

    // Validate required fields
    if (!applicantDetails?.name || !applicantDetails?.aadharNumber) {
      return res.status(400).json({ message: 'Applicant name and Aadhar number are required' });
    }

    if (!landDetails?.surveyNumber || !landDetails?.area) {
      return res.status(400).json({ message: 'Survey number and area are required' });
    }

    // Generate claim ID
    const claimId = `FRA-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;

    const newClaim = {
      claimId,
      applicant: applicantDetails,
      landDetails,
      status: 'draft',
      priority,
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      processingDays: 0,
      documents: documents || [],
      timeline: [
        {
          status: 'draft',
          date: new Date().toISOString(),
          officer: 'system',
          notes: 'Claim created in draft status'
        }
      ],
      notifications: []
    };

    res.status(201).json({
      message: 'Claim created successfully',
      claim: newClaim,
      nextSteps: [
        'Upload required documents',
        'Review and submit claim',
        'Track status through dashboard'
      ]
    });
  } catch (error) {
    console.error('Claim creation error:', error);
    res.status(500).json({ message: 'Server error during claim creation' });
  }
});

// Get all claims with filtering and pagination
router.get('/', simpleAuth, async (req, res) => {
  try {
    const {
      status,
      priority,
      district,
      dateFrom,
      dateTo,
      page = 1,
      limit = 10,
      sortBy = 'submittedAt',
      sortOrder = 'desc'
    } = req.query;

    let filteredClaims = [...mockClaimData.claims];

    // Apply filters
    if (status) {
      filteredClaims = filteredClaims.filter(claim => claim.status === status);
    }
    if (priority) {
      filteredClaims = filteredClaims.filter(claim => claim.priority === priority);
    }
    if (dateFrom) {
      filteredClaims = filteredClaims.filter(claim => 
        new Date(claim.submittedAt) >= new Date(dateFrom)
      );
    }
    if (dateTo) {
      filteredClaims = filteredClaims.filter(claim => 
        new Date(claim.submittedAt) <= new Date(dateTo)
      );
    }

    // Sort claims
    filteredClaims.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedClaims = filteredClaims.slice(startIndex, endIndex);

    // Calculate summary statistics
    const summary = {
      total: filteredClaims.length,
      byStatus: {
        draft: filteredClaims.filter(c => c.status === 'draft').length,
        submitted: filteredClaims.filter(c => c.status === 'submitted').length,
        under_review: filteredClaims.filter(c => c.status === 'under_review').length,
        approved: filteredClaims.filter(c => c.status === 'approved').length,
        rejected: filteredClaims.filter(c => c.status === 'rejected').length
      },
      byPriority: {
        high: filteredClaims.filter(c => c.priority === 'high').length,
        normal: filteredClaims.filter(c => c.priority === 'normal').length,
        low: filteredClaims.filter(c => c.priority === 'low').length
      },
      averageProcessingDays: filteredClaims.reduce((sum, c) => sum + c.processingDays, 0) / filteredClaims.length || 0
    };

    res.json({
      claims: paginatedClaims,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredClaims.length / limit),
        totalItems: filteredClaims.length,
        itemsPerPage: parseInt(limit),
        hasNextPage: endIndex < filteredClaims.length,
        hasPreviousPage: page > 1
      },
      summary,
      filters: { status, priority, district, dateFrom, dateTo }
    });
  } catch (error) {
    console.error('Claims retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific claim by ID
router.get('/:claimId', simpleAuth, async (req, res) => {
  try {
    const { claimId } = req.params;
    
    // Mock claim retrieval - in real app, query database
    const claim = mockClaimData.claims.find(c => c.claimId === claimId) || {
      ...mockClaimData.claims[0],
      claimId
    };

    // Add additional details
    const detailedClaim = {
      ...claim,
      workflowSteps: Object.keys(CLAIM_STATUS_WORKFLOW),
      nextPossibleActions: CLAIM_STATUS_WORKFLOW[claim.status] || [],
      assignedOfficerDetails: {
        id: claim.assignedOfficer,
        name: 'Rajesh Sharma',
        designation: 'Assistant Collector',
        contactNumber: '+91-9876543210',
        email: 'rajesh.sharma@gov.in'
      },
      relatedClaims: [], // claims from same applicant or nearby area
      estimatedCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };

    res.json(detailedClaim);
  } catch (error) {
    console.error('Claim retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update claim status
router.patch('/:claimId/status', simpleAuth, async (req, res) => {
  try {
    const { claimId } = req.params;
    const { newStatus, notes, officerId } = req.body;

    // Validate status transition
    const currentClaim = mockClaimData.claims.find(c => c.claimId === claimId);
    if (!currentClaim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    const allowedTransitions = CLAIM_STATUS_WORKFLOW[currentClaim.status] || [];
    if (!allowedTransitions.includes(newStatus)) {
      return res.status(400).json({ 
        message: `Invalid status transition from ${currentClaim.status} to ${newStatus}`,
        allowedTransitions
      });
    }

    // Create status update
    const statusUpdate = {
      claimId,
      previousStatus: currentClaim.status,
      newStatus,
      updatedBy: officerId || 'officer_001',
      updatedAt: new Date().toISOString(),
      notes,
      timeline: [
        ...currentClaim.timeline,
        {
          status: newStatus,
          date: new Date().toISOString(),
          officer: officerId || 'officer_001',
          notes
        }
      ]
    };

    // Mock notification based on status
    const notification = {
      type: 'status_update',
      message: `Your claim status has been updated to: ${newStatus.replace('_', ' ').toUpperCase()}`,
      sent: new Date().toISOString()
    };

    res.json({
      message: 'Claim status updated successfully',
      statusUpdate,
      notification,
      nextActions: CLAIM_STATUS_WORKFLOW[newStatus] || []
    });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign claim to officer
router.patch('/:claimId/assign', simpleAuth, async (req, res) => {
  try {
    const { claimId } = req.params;
    const { officerId, priority, reason } = req.body;

    const assignment = {
      claimId,
      previousOfficer: 'officer_bhopal_001',
      newOfficer: officerId,
      priority: priority || 'normal',
      assignedAt: new Date().toISOString(),
      assignedBy: 'admin_001', // from auth token
      reason,
      notification: {
        type: 'assignment',
        message: `Claim ${claimId} has been assigned to you`,
        sent: new Date().toISOString()
      }
    };

    res.json({
      message: 'Claim assigned successfully',
      assignment
    });
  } catch (error) {
    console.error('Assignment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment/note to claim
router.post('/:claimId/comments', simpleAuth, async (req, res) => {
  try {
    const { claimId } = req.params;
    const { comment, isPublic = false, attachments = [] } = req.body;

    const newComment = {
      commentId: `CMT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      claimId,
      comment,
      isPublic,
      attachments,
      addedBy: 'officer_001', // from auth token
      addedAt: new Date().toISOString(),
      edited: false
    };

    res.json({
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    console.error('Comment addition error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get claim comments
router.get('/:claimId/comments', simpleAuth, async (req, res) => {
  try {
    const { claimId } = req.params;
    const { includePrivate = false } = req.query;

    const mockComments = [
      {
        commentId: 'CMT_001',
        comment: 'Initial document verification completed successfully',
        isPublic: true,
        addedBy: 'officer_001',
        addedAt: '2024-01-20T11:45:00Z',
        officerName: 'Rajesh Sharma'
      },
      {
        commentId: 'CMT_002',
        comment: 'Field survey scheduled for next week',
        isPublic: true,
        addedBy: 'officer_001',
        addedAt: '2024-02-01T09:30:00Z',
        officerName: 'Rajesh Sharma'
      },
      {
        commentId: 'CMT_003',
        comment: 'Internal note: Check boundary disputes with neighboring claims',
        isPublic: false,
        addedBy: 'officer_001',
        addedAt: '2024-02-05T14:15:00Z',
        officerName: 'Rajesh Sharma'
      }
    ];

    let filteredComments = mockComments;
    if (!includePrivate) {
      filteredComments = mockComments.filter(comment => comment.isPublic);
    }

    res.json({
      claimId,
      comments: filteredComments,
      total: filteredComments.length
    });
  } catch (error) {
    console.error('Comments retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Schedule field survey
router.post('/:claimId/survey/schedule', simpleAuth, async (req, res) => {
  try {
    const { claimId } = req.params;
    const { 
      scheduledDate, 
      surveyorId, 
      estimatedDuration = 4, // hours
      specialInstructions 
    } = req.body;

    const surveySchedule = {
      scheduleId: `SURVEY_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      claimId,
      scheduledDate,
      surveyorId,
      estimatedDuration,
      specialInstructions,
      status: 'scheduled',
      createdBy: 'officer_001',
      createdAt: new Date().toISOString(),
      surveyorDetails: {
        id: surveyorId,
        name: 'Ramesh Surveyor',
        contactNumber: '+91-9876543211',
        experience: '8 years'
      }
    };

    res.json({
      message: 'Field survey scheduled successfully',
      survey: surveySchedule,
      notification: {
        type: 'survey_scheduled',
        message: `Field survey scheduled for ${scheduledDate}`,
        sent: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Survey scheduling error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit field survey report
router.post('/:claimId/survey/report', simpleAuth, async (req, res) => {
  try {
    const { claimId } = req.params;
    const {
      findings,
      measuredArea,
      boundariesVerified,
      occupationEvidence,
      recommendations,
      photos = [],
      gpsCoordinates
    } = req.body;

    const surveyReport = {
      reportId: `RPT_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      claimId,
      surveyorId: 'surveyor_001',
      surveyDate: new Date().toISOString(),
      findings: {
        areaConfirmed: true,
        measuredArea,
        originalArea: 2.45, // from claim
        areaDifference: Math.abs(measuredArea - 2.45),
        boundariesClear: boundariesVerified,
        occupationEvidence,
        environmentalClearance: true
      },
      recommendations,
      photos,
      gpsCoordinates,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };

    res.json({
      message: 'Survey report submitted successfully',
      report: surveyReport,
      nextStep: 'Committee Review'
    });
  } catch (error) {
    console.error('Survey report submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get claim workflow and progress
router.get('/:claimId/workflow', simpleAuth, async (req, res) => {
  try {
    const { claimId } = req.params;
    
    const workflowSteps = [
      { step: 'draft', name: 'Draft', description: 'Claim created but not submitted', status: 'completed', completedAt: '2024-01-15T10:30:00Z' },
      { step: 'submitted', name: 'Submitted', description: 'Claim submitted for review', status: 'completed', completedAt: '2024-01-15T10:35:00Z' },
      { step: 'under_review', name: 'Initial Review', description: 'Initial review by revenue officer', status: 'completed', completedAt: '2024-01-16T09:15:00Z' },
      { step: 'document_verification', name: 'Document Verification', description: 'Verifying submitted documents', status: 'completed', completedAt: '2024-01-20T11:45:00Z' },
      { step: 'field_survey_completed', name: 'Field Survey', description: 'Physical survey of claimed land', status: 'completed', completedAt: '2024-02-10T16:00:00Z' },
      { step: 'committee_review', name: 'Committee Review', description: 'Final review by FRA committee', status: 'in_progress', startedAt: '2024-03-01T10:00:00Z' },
      { step: 'approved', name: 'Approved', description: 'Claim approved for title issuance', status: 'pending' },
      { step: 'title_issued', name: 'Title Issued', description: 'Land title certificate issued', status: 'pending' },
      { step: 'completed', name: 'Completed', description: 'Process completed successfully', status: 'pending' }
    ];

    const currentStep = workflowSteps.find(step => step.status === 'in_progress');
    const completedSteps = workflowSteps.filter(step => step.status === 'completed');
    const progressPercentage = Math.round((completedSteps.length / workflowSteps.length) * 100);

    res.json({
      claimId,
      currentStep: currentStep?.step || 'completed',
      progressPercentage,
      estimatedDaysRemaining: 15, // based on current step and historical data
      workflow: workflowSteps,
      bottlenecks: [
        { step: 'committee_review', reason: 'High workload', estimatedDelay: '7 days' }
      ]
    });
  } catch (error) {
    console.error('Workflow retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Bulk actions on claims
router.post('/bulk-action', simpleAuth, async (req, res) => {
  try {
    const { claimIds, action, actionData } = req.body;
    
    if (!claimIds || claimIds.length === 0) {
      return res.status(400).json({ message: 'No claim IDs provided' });
    }

    const results = [];
    
    for (const claimId of claimIds) {
      let result = { claimId, success: false };
      
      switch (action) {
        case 'assign':
          result = {
            claimId,
            success: true,
            message: `Assigned to officer ${actionData.officerId}`,
            newOfficer: actionData.officerId
          };
          break;
          
        case 'priority_update':
          result = {
            claimId,
            success: true,
            message: `Priority updated to ${actionData.priority}`,
            newPriority: actionData.priority
          };
          break;
          
        case 'status_update':
          result = {
            claimId,
            success: true,
            message: `Status updated to ${actionData.newStatus}`,
            newStatus: actionData.newStatus
          };
          break;
          
        default:
          result = {
            claimId,
            success: false,
            message: 'Invalid action'
          };
      }
      
      results.push(result);
    }

    const summary = {
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length
    };

    res.json({
      message: `Bulk ${action} completed`,
      summary,
      results
    });
  } catch (error) {
    console.error('Bulk action error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
