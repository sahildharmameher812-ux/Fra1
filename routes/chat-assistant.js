const express = require('express');
const router = express.Router();

// Smart Chat Assistant for FRA Atlas
// Handles intelligent Q&A about the project, features, and functionality

/**
 * Knowledge base for the FRA Atlas project
 */
const knowledgeBase = {
  project: {
    name: "FRA Atlas & WebGIS Decision Support System",
    ministry: "Ministry of Tribal Affairs",
    purpose: "AI-Powered system for Forest Rights Act implementation and land rights management",
    description: "An integrated platform combining GIS mapping, document processing, analytics, and decision support for tribal land rights under the Forest Rights Act."
  },
  
  features: {
    gis: {
      description: "Geographic Information System for mapping forest rights claims",
      capabilities: [
        "Interactive map visualization with Leaflet/Mapbox",
        "Spatial analysis and buffering",
        "Multi-layer management (district, forest, claims)",
        "Coordinate transformation and geometry operations",
        "Heatmap and cluster analysis"
      ]
    },
    documents: {
      description: "Document processing and management system",
      capabilities: [
        "OCR (Optical Character Recognition) using Tesseract.js",
        "PDF parsing and text extraction",
        "Named Entity Recognition (NER) for extracting claim details",
        "Multi-format support (PDF, images, scanned documents)",
        "Automated metadata extraction"
      ]
    },
    analytics: {
      description: "Data analytics and visualization",
      capabilities: [
        "Real-time dashboard with charts and graphs",
        "Claim statistics and trends",
        "District-wise analysis",
        "Time-series analysis",
        "Performance metrics and KPIs"
      ]
    },
    satellite: {
      description: "Satellite imagery and remote sensing",
      capabilities: [
        "Satellite data integration",
        "Land use change detection",
        "Forest cover monitoring",
        "NDVI (Normalized Difference Vegetation Index) analysis"
      ]
    },
    decisionSupport: {
      description: "AI-powered decision support system",
      capabilities: [
        "Intelligent recommendations for claim processing",
        "Risk assessment and validation",
        "Policy compliance checking",
        "Automated workflow suggestions"
      ]
    }
  },

  apis: {
    "/api/auth": "Authentication and user management",
    "/api/documents": "Document upload, OCR, and processing",
    "/api/gis": "GIS operations and spatial analysis",
    "/api/analytics": "Analytics data and statistics",
    "/api/analytics-graphs": "Graph and chart data",
    "/api/users": "User management",
    "/api/satellite": "Satellite imagery and remote sensing",
    "/api/claims": "FRA claims management",
    "/api/decision-support": "AI decision support",
    "/api/fra-atlas": "FRA Atlas specific features"
  },

  technologies: {
    backend: ["Node.js", "Express", "MongoDB", "Mongoose"],
    frontend: ["React", "Leaflet/Mapbox", "Chart.js", "Material-UI"],
    ai_ml: ["Tesseract.js (OCR)", "Compromise.js (NLP)", "Custom NER"],
    gis: ["Turf.js", "GeoJSON", "Leaflet"],
    security: ["JWT", "bcrypt", "Helmet", "CORS"]
  },

  fra: {
    fullForm: "Forest Rights Act, 2006",
    purpose: "Recognition of forest rights of Scheduled Tribes and Other Traditional Forest Dwellers",
    rights: [
      "Individual Forest Rights (IFR)",
      "Community Forest Rights (CFR)",
      "Community Forest Resource Rights (CFRR)"
    ],
    claimProcess: [
      "Application submission by claimant",
      "Verification by Forest Rights Committee (FRC)",
      "Recommendation by Sub-Divisional Level Committee (SDLC)",
      "Final approval by District Level Committee (DLC)"
    ]
  }
};

/**
 * Polite greeting responses
 */
const politeGreetings = [
  "Thank you for your question! I'll be happy to explain that in detail.",
  "I appreciate your interest! Let me provide you with comprehensive information.",
  "That's a great question! I'm here to help you understand everything about this.",
  "Thank you for reaching out! I'd be delighted to assist you with this information.",
  "I'm glad you asked! Allow me to share detailed information with you.",
  "Excellent question! I'll provide you with all the details you need.",
  "Thank you for your query! I'm here to give you complete information."
];

function getPoliteGreeting() {
  return politeGreetings[Math.floor(Math.random() * politeGreetings.length)];
}

/**
 * Intelligent response generator with respectful responses
 */
function generateSmartResponse(query) {
  const lowerQuery = query.toLowerCase();
  const greeting = getPoliteGreeting();
  
  // Project overview questions
  if (lowerQuery.includes('what is') || lowerQuery.includes('about project') || 
      lowerQuery.includes('what does') || lowerQuery.includes('explain project')) {
    return {
      answer: `${greeting}\n\n🌿 **${knowledgeBase.project.name}**\n\n` +
              `This is an AI-powered platform developed for the ${knowledgeBase.project.ministry}. ` +
              `${knowledgeBase.project.description}\n\n` +
              `**Key Components:**\n` +
              `🗺️ **GIS Mapping** - Interactive spatial analysis and visualization\n` +
              `📄 **Document Processing** - OCR and automated data extraction\n` +
              `📊 **Analytics** - Real-time insights and reporting\n` +
              `🛰️ **Satellite Integration** - Remote sensing and monitoring\n` +
              `🤖 **AI Decision Support** - Intelligent recommendations\n\n` +
              `The system streamlines FRA claim processing and helps ensure tribal communities receive their rightful forest rights.\n\n` +
              `**Target Users:**\n` +
              `• Government officials processing FRA claims\n` +
              `• Tribal communities applying for forest rights\n` +
              `• District and state level administrators\n` +
              `• Policy makers and analysts\n\n` +
              `If you have any more questions, please feel free to ask! 😊`,
      confidence: 0.95,
      category: "project_overview"
    };
  }

  // FRA related questions
  if (lowerQuery.includes('fra') || lowerQuery.includes('forest rights act') || 
      lowerQuery.includes('forest rights')) {
    return {
      answer: `📜 **Forest Rights Act (FRA), 2006**\n\n` +
              `**Purpose:** ${knowledgeBase.fra.purpose}\n\n` +
              `**Types of Rights:**\n` +
              knowledgeBase.fra.rights.map((r, i) => `${i + 1}. ${r}`).join('\n') + '\n\n' +
              `**Claim Process:**\n` +
              knowledgeBase.fra.claimProcess.map((step, i) => `${i + 1}. ${step}`).join('\n') + '\n\n' +
              `This system helps digitize and streamline this entire process, making it more transparent and efficient.`,
      confidence: 0.98,
      category: "fra_information"
    };
  }

  // Features questions
  if (lowerQuery.includes('feature') || lowerQuery.includes('can do') || 
      lowerQuery.includes('capabilities')) {
    let featureList = '';
    Object.entries(knowledgeBase.features).forEach(([key, feature]) => {
      featureList += `\n\n**${feature.description}**\n`;
      featureList += feature.capabilities.map(cap => `• ${cap}`).join('\n');
    });
    
    return {
      answer: `🚀 **FRA Atlas System Capabilities:**${featureList}\n\n` +
              `All these features work together to provide a comprehensive solution for FRA implementation!`,
      confidence: 0.92,
      category: "features"
    };
  }

  // GIS questions
  if (lowerQuery.includes('gis') || lowerQuery.includes('map') || 
      lowerQuery.includes('spatial') || lowerQuery.includes('location')) {
    return {
      answer: `🗺️ **GIS & Mapping Features:**\n\n` +
              `${knowledgeBase.features.gis.description}\n\n` +
              `**What you can do:**\n` +
              knowledgeBase.features.gis.capabilities.map(cap => `✓ ${cap}`).join('\n') + '\n\n' +
              `**API Endpoint:** \`/api/gis\`\n` +
              `**Technologies:** Leaflet.js, Turf.js, GeoJSON\n\n` +
              `The GIS module allows stakeholders to visualize claims on interactive maps, perform spatial queries, and conduct buffer analysis around protected areas.`,
      confidence: 0.94,
      category: "gis"
    };
  }

  // Document processing questions
  if (lowerQuery.includes('document') || lowerQuery.includes('ocr') || 
      lowerQuery.includes('upload') || lowerQuery.includes('pdf') || 
      lowerQuery.includes('scan')) {
    return {
      answer: `📄 **Document Processing System:**\n\n` +
              `${knowledgeBase.features.documents.description}\n\n` +
              `**Capabilities:**\n` +
              knowledgeBase.features.documents.capabilities.map(cap => `• ${cap}`).join('\n') + '\n\n' +
              `**How it works:**\n` +
              `1. Upload documents (PDF, images, scanned files)\n` +
              `2. OCR extracts text from images using Tesseract.js\n` +
              `3. NLP extracts entities (names, dates, plot numbers)\n` +
              `4. Data is structured and stored for analysis\n\n` +
              `**API Endpoint:** \`/api/documents\`\n\n` +
              `This eliminates manual data entry and speeds up claim processing significantly!`,
      confidence: 0.96,
      category: "documents"
    };
  }

  // Analytics questions
  if (lowerQuery.includes('analytic') || lowerQuery.includes('dashboard') || 
      lowerQuery.includes('statistics') || lowerQuery.includes('report') || 
      lowerQuery.includes('chart') || lowerQuery.includes('graph')) {
    return {
      answer: `📊 **Analytics & Visualization:**\n\n` +
              `${knowledgeBase.features.analytics.description}\n\n` +
              `**Available Analytics:**\n` +
              knowledgeBase.features.analytics.capabilities.map(cap => `• ${cap}`).join('\n') + '\n\n' +
              `**API Endpoints:**\n` +
              `• \`/api/analytics\` - General analytics data\n` +
              `• \`/api/analytics-graphs\` - Chart-specific data\n\n` +
              `**Access Dashboard:** Visit \`http://localhost:5000/dashboard\` to view the interactive analytics dashboard with real-time visualizations.`,
      confidence: 0.93,
      category: "analytics"
    };
  }

  // API questions
  if (lowerQuery.includes('api') || lowerQuery.includes('endpoint') || 
      lowerQuery.includes('route')) {
    let apiList = '\n';
    Object.entries(knowledgeBase.apis).forEach(([endpoint, description]) => {
      apiList += `\n**${endpoint}**\n└─ ${description}\n`;
    });
    
    return {
      answer: `🔌 **Available API Endpoints:**${apiList}\n\n` +
              `**Base URL:** \`http://localhost:5000\`\n` +
              `**Health Check:** \`GET /api/health\`\n\n` +
              `All APIs use JSON format and support RESTful conventions. Authentication required for protected routes using JWT tokens.`,
      confidence: 0.97,
      category: "api"
    };
  }

  // Technology stack questions
  if (lowerQuery.includes('technology') || lowerQuery.includes('tech stack') || 
      lowerQuery.includes('built with') || lowerQuery.includes('framework')) {
    return {
      answer: `💻 **Technology Stack:**\n\n` +
              `**Backend:**\n${knowledgeBase.technologies.backend.map(t => `• ${t}`).join('\n')}\n\n` +
              `**Frontend:**\n${knowledgeBase.technologies.frontend.map(t => `• ${t}`).join('\n')}\n\n` +
              `**AI/ML:**\n${knowledgeBase.technologies.ai_ml.map(t => `• ${t}`).join('\n')}\n\n` +
              `**GIS:**\n${knowledgeBase.technologies.gis.map(t => `• ${t}`).join('\n')}\n\n` +
              `**Security:**\n${knowledgeBase.technologies.security.map(t => `• ${t}`).join('\n')}\n\n` +
              `The stack is chosen for scalability, security, and ease of integration with government systems.`,
      confidence: 0.95,
      category: "technology"
    };
  }

  // Setup/Installation questions
  if (lowerQuery.includes('install') || lowerQuery.includes('setup') || 
      lowerQuery.includes('run') || lowerQuery.includes('start') || 
      lowerQuery.includes('deploy')) {
    return {
      answer: `⚙️ **Getting Started:**\n\n` +
              `**Installation:**\n` +
              `\`\`\`bash\n` +
              `# Install all dependencies\n` +
              `npm run install-all\n\n` +
              `# Copy environment file\n` +
              `cp .env.example .env\n` +
              `\`\`\`\n\n` +
              `**Running the Application:**\n` +
              `\`\`\`bash\n` +
              `# Development mode (runs both backend and frontend)\n` +
              `npm run dev\n\n` +
              `# Backend only\n` +
              `npm run server\n\n` +
              `# Frontend only\n` +
              `npm run client\n\n` +
              `# Production\n` +
              `npm start\n` +
              `\`\`\`\n\n` +
              `**Access Points:**\n` +
              `• Backend API: http://localhost:5000\n` +
              `• Frontend: http://localhost:3000\n` +
              `• Dashboard: http://localhost:5000/dashboard\n\n` +
              `Check \`DEPLOYMENT_GUIDE.md\` for detailed deployment instructions!`,
      confidence: 0.96,
      category: "setup"
    };
  }

  // Security questions
  if (lowerQuery.includes('security') || lowerQuery.includes('authentication') || 
      lowerQuery.includes('auth') || lowerQuery.includes('login') || 
      lowerQuery.includes('secure')) {
    return {
      answer: `🔐 **Security Features:**\n\n` +
              `**Authentication:**\n` +
              `• JWT (JSON Web Tokens) for stateless authentication\n` +
              `• Bcrypt for password hashing\n` +
              `• Session management and token expiration\n\n` +
              `**Security Middleware:**\n` +
              `• Helmet.js for HTTP header protection\n` +
              `• CORS configuration for cross-origin requests\n` +
              `• Rate limiting to prevent abuse\n` +
              `• Input validation and sanitization\n\n` +
              `**Data Protection:**\n` +
              `• Encrypted connections (HTTPS in production)\n` +
              `• Role-based access control (RBAC)\n` +
              `• Audit logging for sensitive operations\n\n` +
              `**API Endpoint:** \`/api/auth\` for login/register\n\n` +
              `All sensitive data is encrypted and follows government security standards.`,
      confidence: 0.94,
      category: "security"
    };
  }

  // Satellite/Remote Sensing questions
  if (lowerQuery.includes('satellite') || lowerQuery.includes('remote sensing') || 
      lowerQuery.includes('ndvi') || lowerQuery.includes('imagery')) {
    return {
      answer: `🛰️ **Satellite & Remote Sensing:**\n\n` +
              `${knowledgeBase.features.satellite.description}\n\n` +
              `**Capabilities:**\n` +
              knowledgeBase.features.satellite.capabilities.map(cap => `• ${cap}`).join('\n') + '\n\n' +
              `**Use Cases:**\n` +
              `• Verify forest cover on claimed land\n` +
              `• Monitor deforestation and land use changes\n` +
              `• Assess environmental impact\n` +
              `• Support evidence-based decision making\n\n` +
              `**API Endpoint:** \`/api/satellite\`\n\n` +
              `Integration with satellite data providers enables real-time monitoring and validation of claims.`,
      confidence: 0.91,
      category: "satellite"
    };
  }

  // Decision Support questions
  if (lowerQuery.includes('decision') || lowerQuery.includes('ai') || 
      lowerQuery.includes('recommendation') || lowerQuery.includes('support')) {
    return {
      answer: `🤖 **AI Decision Support System:**\n\n` +
              `${knowledgeBase.features.decisionSupport.description}\n\n` +
              `**Features:**\n` +
              knowledgeBase.features.decisionSupport.capabilities.map(cap => `• ${cap}`).join('\n') + '\n\n' +
              `**How it helps:**\n` +
              `• Analyzes historical claim data\n` +
              `• Identifies potential issues early\n` +
              `• Suggests optimal processing workflow\n` +
              `• Ensures policy compliance\n` +
              `• Reduces processing time and errors\n\n` +
              `**API Endpoint:** \`/api/decision-support\`\n\n` +
              `The AI engine learns from past decisions to provide increasingly accurate recommendations over time.`,
      confidence: 0.92,
      category: "decision_support"
    };
  }

  // Database questions
  if (lowerQuery.includes('database') || lowerQuery.includes('mongodb') || 
      lowerQuery.includes('storage') || lowerQuery.includes('data')) {
    return {
      answer: `🗄️ **Database & Storage:**\n\n` +
              `**Database:** MongoDB (NoSQL)\n` +
              `**ODM:** Mongoose for schema modeling\n\n` +
              `**Why MongoDB?**\n` +
              `• Flexible schema for varying claim data\n` +
              `• Excellent GeoJSON support for spatial data\n` +
              `• Scalable for large datasets\n` +
              `• Fast queries for analytics\n\n` +
              `**Data Stored:**\n` +
              `• User accounts and roles\n` +
              `• FRA claims and applications\n` +
              `• Processed documents and OCR results\n` +
              `• GIS layers and geometries\n` +
              `• Analytics and audit logs\n\n` +
              `**File Storage:**\n` +
              `• Uploaded documents: \`/uploads\`\n` +
              `• GIS datasets: \`/datasets\`\n\n` +
              `The system can run in demo mode without MongoDB for testing purposes.`,
      confidence: 0.93,
      category: "database"
    };
  }

  // Users/Roles questions
  if (lowerQuery.includes('user') || lowerQuery.includes('role') || 
      lowerQuery.includes('permission') || lowerQuery.includes('access')) {
    return {
      answer: `👥 **User Management & Roles:**\n\n` +
              `**User Types:**\n` +
              `• **Admin** - Full system access, user management\n` +
              `• **Officer** - Claim processing, document review\n` +
              `• **Analyst** - Analytics, reporting, data export\n` +
              `• **Field Worker** - Data collection, claim submission\n` +
              `• **Public User** - View public data, track applications\n\n` +
              `**Role-Based Access:**\n` +
              `• Granular permissions per feature\n` +
              `• Department-specific access controls\n` +
              `• District/state level data filtering\n\n` +
              `**API Endpoint:** \`/api/users\`\n\n` +
              `**Features:**\n` +
              `• User registration and approval workflow\n` +
              `• Profile management\n` +
              `• Activity tracking and audit logs\n` +
              `• Password reset and account recovery\n\n` +
              `This ensures data security and proper workflow management across the system.`,
      confidence: 0.94,
      category: "users"
    };
  }

  // Claims processing questions
  if (lowerQuery.includes('claim') || lowerQuery.includes('application') || 
      lowerQuery.includes('process')) {
    return {
      answer: `📋 **Claims Management:**\n\n` +
              `**API Endpoint:** \`/api/claims\`\n\n` +
              `**Claim Lifecycle:**\n` +
              `1. **Submission** - Applicant submits claim with documents\n` +
              `2. **Verification** - Field verification and document review\n` +
              `3. **Committee Review** - FRC, SDLC, DLC review stages\n` +
              `4. **Decision** - Approval/rejection with reasoning\n` +
              `5. **Title Grant** - Issue of rights certificate\n\n` +
              `**System Features:**\n` +
              `• Digital claim submission\n` +
              `• Automated document processing (OCR)\n` +
              `• GIS-based land mapping\n` +
              `• Workflow tracking and notifications\n` +
              `• Committee collaboration tools\n` +
              `• Decision support recommendations\n` +
              `• Status tracking for applicants\n\n` +
              `The system ensures transparency and reduces processing time from months to weeks!`,
      confidence: 0.97,
      category: "claims"
    };
  }

  // Help/General questions
  if (lowerQuery.includes('help') || lowerQuery.includes('how to') || 
      lowerQuery.includes('guide') || lowerQuery === 'hi' || 
      lowerQuery === 'hello' || lowerQuery.includes('assist')) {
    return {
      answer: `👋 **Welcome to FRA Atlas Chat Assistant!**\n\n` +
              `I'm here to help you understand this AI-powered Forest Rights Act system. Here's what I can help you with:\n\n` +
              `**Ask me about:**\n` +
              `• 🌿 Project overview and purpose\n` +
              `• 📜 Forest Rights Act (FRA) information\n` +
              `• 🚀 System features and capabilities\n` +
              `• 🗺️ GIS and mapping functionality\n` +
              `• 📄 Document processing and OCR\n` +
              `• 📊 Analytics and dashboards\n` +
              `• 🔌 API endpoints and usage\n` +
              `• 💻 Technology stack\n` +
              `• ⚙️ Installation and setup\n` +
              `• 🔐 Security and authentication\n` +
              `• 🛰️ Satellite imagery integration\n` +
              `• 🤖 AI decision support\n` +
              `• 📋 Claims processing workflow\n\n` +
              `**Example questions:**\n` +
              `• "What is this project about?"\n` +
              `• "How does the GIS system work?"\n` +
              `• "What are the API endpoints?"\n` +
              `• "How do I set up the project?"\n` +
              `• "Explain the document processing feature"\n\n` +
              `Just ask me anything! 😊`,
      confidence: 1.0,
      category: "help"
    };
  }

  // Default fallback
  return {
    answer: `🤔 I understand you're asking about: "${query}"\n\n` +
            `While I don't have a specific answer for that exact question, I can help with:\n\n` +
            `• Project information and features\n` +
            `• FRA (Forest Rights Act) details\n` +
            `• GIS mapping and spatial analysis\n` +
            `• Document processing and OCR\n` +
            `• Analytics and reporting\n` +
            `• API endpoints and integration\n` +
            `• Setup and deployment\n` +
            `• Security and authentication\n\n` +
            `Try asking something like:\n` +
            `• "What features does the system have?"\n` +
            `• "How does document processing work?"\n` +
            `• "Tell me about the GIS capabilities"\n` +
            `• "What APIs are available?"\n\n` +
            `Or type "help" to see all available topics!`,
    confidence: 0.5,
    category: "fallback"
  };
}

/**
 * POST /api/chat
 * Main chat endpoint - accepts user questions and returns intelligent responses
 */
router.post('/', (req, res) => {
  try {
    const { message, userId, sessionId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required',
        success: false
      });
    }

    // Generate intelligent response
    const response = generateSmartResponse(message.trim());

    // Log interaction (in production, save to database)
    console.log(`[Chat Assistant] Query: "${message}" | Category: ${response.category} | Confidence: ${response.confidence}`);

    res.json({
      success: true,
      query: message,
      response: response.answer,
      confidence: response.confidence,
      category: response.category,
      timestamp: new Date().toISOString(),
      sessionId: sessionId || 'default'
    });

  } catch (error) {
    console.error('Chat Assistant Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your question',
      message: error.message
    });
  }
});

/**
 * GET /api/chat/topics
 * Returns available help topics
 */
router.get('/topics', (req, res) => {
  res.json({
    success: true,
    topics: [
      { id: 'project', name: 'Project Overview', icon: '🌿' },
      { id: 'fra', name: 'Forest Rights Act', icon: '📜' },
      { id: 'features', name: 'System Features', icon: '🚀' },
      { id: 'gis', name: 'GIS & Mapping', icon: '🗺️' },
      { id: 'documents', name: 'Document Processing', icon: '📄' },
      { id: 'analytics', name: 'Analytics & Reports', icon: '📊' },
      { id: 'api', name: 'API Documentation', icon: '🔌' },
      { id: 'technology', name: 'Technology Stack', icon: '💻' },
      { id: 'setup', name: 'Setup & Installation', icon: '⚙️' },
      { id: 'security', name: 'Security', icon: '🔐' }
    ]
  });
});

/**
 * GET /api/chat/quick-questions
 * Returns suggested quick questions
 */
router.get('/quick-questions', (req, res) => {
  res.json({
    success: true,
    questions: [
      "What is FRA Atlas?",
      "How does the GIS system work?",
      "What is the Forest Rights Act?",
      "How do I upload and process documents?",
      "What analytics are available?",
      "How do I set up the project?",
      "What are the API endpoints?",
      "How does the AI decision support work?",
      "What security features are implemented?",
      "How is the claims process managed?"
    ]
  });
});

/**
 * POST /api/chat/feedback
 * Collect feedback on chat responses (for improvement)
 */
router.post('/feedback', (req, res) => {
  try {
    const { sessionId, messageId, rating, comment } = req.body;

    // In production, save to database
    console.log(`[Chat Feedback] Session: ${sessionId}, Rating: ${rating}/5, Comment: ${comment}`);

    res.json({
      success: true,
      message: 'Thank you for your feedback!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to submit feedback'
    });
  }
});

/**
 * GET /api/chat/stats
 * Get chat statistics (for admin)
 */
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalQueries: 0,
      averageConfidence: 0.92,
      topCategories: [
        { category: 'features', count: 45 },
        { category: 'gis', count: 38 },
        { category: 'setup', count: 32 },
        { category: 'api', count: 28 },
        { category: 'fra_information', count: 25 }
      ],
      commonQueries: [
        "What is FRA Atlas?",
        "How does document processing work?",
        "What are the features?"
      ]
    }
  });
});

module.exports = router;
