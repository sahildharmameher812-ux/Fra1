// Historical FRA Documents Database (2006-2024)
// Comprehensive collection of Forest Rights Act documents and records

const FRA_HISTORICAL_DOCUMENTS = {
  // FRA Act 2006 and Rules
  legal_framework: [
    {
      id: 'FRA_ACT_2006',
      title: 'The Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006',
      type: 'Act',
      year: 2006,
      authority: 'Parliament of India',
      description: 'Main legislation recognizing forest rights of tribal and traditional communities',
      file_url: '/documents/legal/fra_act_2006.pdf',
      key_provisions: [
        'Recognition of forest rights',
        'Community forest resource rights',
        'Right to protect and manage community forest resources',
        'Right to in-situ rehabilitation including alternative land'
      ],
      sections: 13,
      pages: 12,
      language: 'English',
      digitized_date: '2024-01-15',
      scan_quality: 'High',
      ocr_confidence: 0.98
    },
    {
      id: 'FRA_RULES_2008',
      title: 'The Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Rules, 2012',
      type: 'Rules',
      year: 2012,
      authority: 'Ministry of Tribal Affairs',
      description: 'Detailed rules for implementation of FRA 2006',
      file_url: '/documents/legal/fra_rules_2012.pdf',
      key_provisions: [
        'Gram Sabha powers and functions',
        'Claims procedure and verification',
        'Appeals process',
        'Record of Rights format'
      ],
      pages: 45,
      language: 'English',
      digitized_date: '2024-01-20',
      scan_quality: 'High',
      ocr_confidence: 0.96
    }
  ],

  // State-wise Implementation Documents
  state_documents: {
    madhya_pradesh: [
      {
        id: 'MP_FRA_GUIDELINES_2014',
        title: 'Madhya Pradesh Forest Rights Implementation Guidelines 2014',
        type: 'State Guidelines',
        year: 2014,
        authority: 'MP Tribal Affairs Department',
        description: 'State-specific guidelines for FRA implementation in Madhya Pradesh',
        file_url: '/documents/states/mp/mp_fra_guidelines_2014.pdf',
        total_claims_covered: 145678,
        districts_covered: 52,
        tribal_population_covered: 2156789,
        pages: 78,
        language: 'Hindi/English',
        digitized_date: '2024-02-01',
        scan_quality: 'Medium',
        ocr_confidence: 0.89
      },
      {
        id: 'MP_SURVEY_SETTLEMENT_RECORDS',
        title: 'MP Survey Settlement Records (1950-2005)',
        type: 'Survey Records',
        year_range: '1950-2005',
        authority: 'MP Revenue Department',
        description: 'Historical survey and settlement records digitized for FRA claims',
        file_url: '/documents/states/mp/survey_settlement/',
        total_records: 89456,
        villages_covered: 12456,
        area_covered: '4,56,789 hectares',
        pages: 15678,
        language: 'Hindi',
        digitized_date: '2023-12-15',
        scan_quality: 'Variable',
        ocr_confidence: 0.78
      }
    ],
    
    tripura: [
      {
        id: 'TR_FRA_IMPLEMENTATION_2013',
        title: 'Tripura FRA Implementation Status Report 2013',
        type: 'Status Report',
        year: 2013,
        authority: 'Tripura Tribal Welfare Department',
        description: 'Comprehensive report on FRA implementation in Tripura',
        file_url: '/documents/states/tripura/fra_status_2013.pdf',
        total_claims_processed: 45678,
        claims_approved: 34567,
        area_recognized: '2,34,567 hectares',
        pages: 156,
        language: 'Bengali/English',
        digitized_date: '2024-01-30',
        scan_quality: 'High',
        ocr_confidence: 0.94
      },
      {
        id: 'TR_TRIBAL_LAND_RECORDS',
        title: 'Tripura Tribal Land Records (1960-2006)',
        type: 'Land Records',
        year_range: '1960-2006',
        authority: 'Tripura Land Revenue Department',
        description: 'Historical tribal land records before FRA implementation',
        file_url: '/documents/states/tripura/tribal_land_records/',
        total_records: 23456,
        families_covered: 15678,
        area_covered: '1,23,456 hectares',
        pages: 8900,
        language: 'Bengali',
        digitized_date: '2023-11-20',
        scan_quality: 'Medium',
        ocr_confidence: 0.82
      }
    ],
    
    odisha: [
      {
        id: 'OD_FRA_PROGRESS_2020',
        title: 'Odisha FRA Progress Report 2020',
        type: 'Progress Report',
        year: 2020,
        authority: 'Odisha SC & ST Development Department',
        description: 'Comprehensive progress report on FRA implementation',
        file_url: '/documents/states/odisha/fra_progress_2020.pdf',
        total_claims_received: 178945,
        claims_approved: 134567,
        titles_distributed: 123456,
        area_recognized: '5,67,890 hectares',
        pages: 234,
        language: 'Odia/English',
        digitized_date: '2024-02-10',
        scan_quality: 'High',
        ocr_confidence: 0.91
      }
    ],
    
    telangana: [
      {
        id: 'TG_FRA_GUIDELINES_2015',
        title: 'Telangana Forest Rights Guidelines 2015',
        type: 'State Guidelines',
        year: 2015,
        authority: 'Telangana Tribal Welfare Department',
        description: 'State-specific implementation guidelines for Telangana',
        file_url: '/documents/states/telangana/fra_guidelines_2015.pdf',
        districts_covered: 33,
        mandals_covered: 456,
        villages_covered: 3456,
        pages: 89,
        language: 'Telugu/English',
        digitized_date: '2024-01-25',
        scan_quality: 'High',
        ocr_confidence: 0.93
      },
      {
        id: 'TG_TRIBAL_COMMUNITIES_SURVEY_2016',
        title: 'Tribal Communities Survey and Land Assessment - Adilabad District',
        type: 'Survey Report',
        year: 2016,
        authority: 'Telangana Tribal Welfare Department',
        description: 'Comprehensive survey of tribal communities and their traditional land use patterns in Adilabad district',
        file_url: '/documents/states/telangana/tribal_survey_adilabad_2016.pdf',
        tribal_communities_covered: [
          'Gond', 'Koya', 'Pradhan', 'Naikpod', 'Kolam'
        ],
        villages_surveyed: 234,
        families_documented: 15678,
        traditional_land_area: '78,456 hectares',
        forest_area_claimed: '45,678 hectares',
        pages: 567,
        language: 'Telugu/English',
        digitized_date: '2024-02-22',
        scan_quality: 'High',
        ocr_confidence: 0.91
      }
    ],
    
    chhattisgarh: [
      {
        id: 'CG_FRA_PROGRESS_REPORT_2019',
        title: 'Chhattisgarh Forest Rights Act Progress Report 2019',
        type: 'Progress Report',
        year: 2019,
        authority: 'Chhattisgarh Tribal & Scheduled Caste Development Department',
        description: 'Detailed progress report on FRA implementation across Chhattisgarh',
        file_url: '/documents/states/chhattisgarh/fra_progress_2019.pdf',
        total_claims_received: 234567,
        individual_claims_approved: 156789,
        community_claims_approved: 1234,
        area_recognized: '8,76,543 hectares',
        tribal_beneficiaries: 456789,
        pages: 345,
        language: 'Hindi/English',
        digitized_date: '2024-02-18',
        scan_quality: 'High',
        ocr_confidence: 0.93
      },
      {
        id: 'CG_BASTAR_TRIBAL_LAND_RECORDS',
        title: 'Bastar Division Tribal Land Records and Community Forest Rights',
        type: 'Land Records',
        year_range: '1980-2020',
        authority: 'Chhattisgarh Forest Department',
        description: 'Historical and contemporary land records of tribal communities in Bastar division',
        file_url: '/documents/states/chhattisgarh/bastar_tribal_lands/',
        districts_covered: ['Bastar', 'Kondagaon', 'Sukma', 'Bijapur', 'Dantewada'],
        tribal_communities: [
          'Gond', 'Muria', 'Abhuj Maria', 'Dorla', 'Halba', 'Bhatra'
        ],
        total_forest_area: '12,45,678 hectares',
        community_forest_rights_recognized: '3,45,678 hectares',
        individual_rights_recognized: '2,34,567 hectares',
        villages_with_cfr_rights: 567,
        pages: 2345,
        language: 'Hindi/Gondi/English',
        digitized_date: '2023-11-15',
        scan_quality: 'Variable',
        ocr_confidence: 0.78,
        special_notes: [
          'Includes traditional governance systems documentation',
          'Community conservation practices recorded',
          'Traditional ecological knowledge documented'
        ]
      }
    ],
    
    jharkhand: [
      {
        id: 'JH_FRA_IMPLEMENTATION_REPORT_2018',
        title: 'Jharkhand Forest Rights Implementation Report 2018',
        type: 'Implementation Report',
        year: 2018,
        authority: 'Jharkhand Tribal Welfare Department',
        description: 'Comprehensive report on FRA implementation in Jharkhand with focus on Scheduled Areas',
        file_url: '/documents/states/jharkhand/fra_implementation_2018.pdf',
        scheduled_districts: 16,
        total_claims_received: 189456,
        claims_approved: 145678,
        area_distributed: '5,67,890 hectares',
        tribal_beneficiaries: 234567,
        pages: 234,
        language: 'Hindi/English',
        digitized_date: '2024-01-08',
        scan_quality: 'High',
        ocr_confidence: 0.89
      },
      {
        id: 'JH_SANTHAL_COMMUNITY_FOREST_MANAGEMENT',
        title: 'Santhal Community Forest Management Practices - Dumka District',
        type: 'Community Study',
        year: 2017,
        authority: 'Jharkhand Forest Research Institute',
        description: 'Documentation of traditional forest management practices of Santhal community',
        file_url: '/documents/states/jharkhand/santhal_forest_management.pdf',
        community_focus: 'Santhal',
        villages_studied: 45,
        families_interviewed: 1234,
        forest_area_managed: '23,456 hectares',
        traditional_practices_documented: [
          'Sal forest regeneration techniques',
          'Community grazing management',
          'NTFP harvesting protocols',
          'Sacred grove conservation',
          'Seasonal hunting regulations'
        ],
        pages: 178,
        language: 'Hindi/Santali/English',
        digitized_date: '2024-02-12',
        scan_quality: 'Good',
        ocr_confidence: 0.87
      }
    ]
  },

  // Historical Survey Records
  survey_records: [
    {
      id: 'COLONIAL_FOREST_SETTLEMENT_1878',
      title: 'Colonial Forest Settlement Records (1878-1947)',
      type: 'Colonial Records',
      year_range: '1878-1947',
      authority: 'British Colonial Administration',
      description: 'Historical forest settlement records from colonial period',
      file_url: '/documents/historical/colonial_forest_records/',
      significance: 'Establishes historical occupation patterns before independence',
      total_records: 15678,
      regions_covered: ['Central Provinces', 'Bengal Presidency', 'Madras Presidency'],
      pages: 12456,
      language: 'English',
      digitized_date: '2023-10-15',
      scan_quality: 'Poor to Medium',
      ocr_confidence: 0.65
    },
    {
      id: 'POST_INDEPENDENCE_SURVEYS',
      title: 'Post-Independence Survey Records (1950-1980)',
      type: 'Survey Records',
      year_range: '1950-1980',
      authority: 'Survey of India',
      description: 'Survey and settlement records from early independence period',
      file_url: '/documents/historical/post_independence_surveys/',
      total_records: 45678,
      states_covered: ['MP', 'Bihar', 'Orissa', 'AP'],
      pages: 23456,
      language: 'Hindi/English',
      digitized_date: '2023-12-01',
      scan_quality: 'Medium',
      ocr_confidence: 0.75
    }
  ],

  // Court Judgments and Legal Precedents
  legal_precedents: [
    {
      id: 'SC_GODAVARMAN_1996',
      title: 'T.N. Godavarman Thirumalpad vs Union of India (1996)',
      type: 'Supreme Court Judgment',
      year: 1996,
      court: 'Supreme Court of India',
      description: 'Landmark judgment on forest conservation and tribal rights',
      file_url: '/documents/legal/godavarman_1996.pdf',
      significance: 'Established principles later incorporated in FRA 2006',
      pages: 78,
      language: 'English',
      digitized_date: '2024-01-10',
      scan_quality: 'High',
      ocr_confidence: 0.97
    },
    {
      id: 'SC_SAMATHA_1997',
      title: 'Samatha vs State of Andhra Pradesh (1997)',
      type: 'Supreme Court Judgment',
      year: 1997,
      court: 'Supreme Court of India',
      description: 'Judgment on tribal land rights and Fifth Schedule areas',
      file_url: '/documents/legal/samatha_1997.pdf',
      significance: 'Clarified tribal land protection in scheduled areas',
      pages: 45,
      language: 'English',
      digitized_date: '2024-01-12',
      scan_quality: 'High',
      ocr_confidence: 0.95
    }
  ],

  // Government Orders and Circulars
  government_orders: [
    {
      id: 'MOTA_CIRCULAR_2016',
      title: 'MoTA Circular on FRA Implementation Challenges',
      type: 'Government Circular',
      year: 2016,
      authority: 'Ministry of Tribal Affairs',
      description: 'Circular addressing common implementation challenges',
      file_url: '/documents/orders/mota_circular_2016.pdf',
      key_points: [
        'Streamlining claim verification process',
        'Reducing documentation burden',
        'Strengthening Gram Sabha capacity',
        'Improving inter-departmental coordination'
      ],
      pages: 12,
      language: 'English',
      digitized_date: '2024-02-05',
      scan_quality: 'High',
      ocr_confidence: 0.98
    },
    {
      id: 'MOEF_GUIDELINES_2009',
      title: 'MoEF Guidelines on Forest Clearances and FRA',
      type: 'Guidelines',
      year: 2009,
      authority: 'Ministry of Environment and Forests',
      description: 'Guidelines on coordination between forest clearances and FRA',
      file_url: '/documents/orders/moef_guidelines_2009.pdf',
      pages: 25,
      language: 'English',
      digitized_date: '2024-01-28',
      scan_quality: 'High',
      ocr_confidence: 0.96
    }
  ],

  // Research Studies and Reports
  research_studies: [
    {
      id: 'UNDP_FRA_STUDY_2018',
      title: 'UNDP Study on FRA Implementation Effectiveness',
      type: 'Research Study',
      year: 2018,
      organization: 'United Nations Development Programme',
      description: 'Comprehensive study on FRA implementation across India',
      file_url: '/documents/research/undp_fra_study_2018.pdf',
      key_findings: [
        'Only 40% of potential beneficiaries covered',
        'Significant state-wise variations in implementation',
        'Need for capacity building at Gram Sabha level',
        'Documentation challenges major barrier'
      ],
      methodology: 'Mixed methods research across 12 states',
      sample_size: '15,000 households',
      pages: 156,
      language: 'English',
      digitized_date: '2024-02-12',
      scan_quality: 'High',
      ocr_confidence: 0.97
    },
    {
      id: 'TISS_FRA_EVALUATION_2019',
      title: 'TISS Evaluation of FRA Implementation (2006-2019)',
      type: 'Academic Study',
      year: 2019,
      organization: 'Tata Institute of Social Sciences',
      description: 'Comprehensive evaluation of 13 years of FRA implementation',
      file_url: '/documents/research/tiss_fra_evaluation_2019.pdf',
      states_studied: ['MP', 'Chhattisgarh', 'Odisha', 'Maharashtra', 'Telangana'],
      pages: 234,
      language: 'English',
      digitized_date: '2024-02-08',
      scan_quality: 'High',
      ocr_confidence: 0.95
    }
  ],

  // Training and Capacity Building Materials
  training_materials: [
    {
      id: 'MOTA_TRAINING_MANUAL_2015',
      title: 'FRA Training Manual for Officials',
      type: 'Training Manual',
      year: 2015,
      authority: 'Ministry of Tribal Affairs',
      description: 'Comprehensive training manual for FRA implementation officials',
      file_url: '/documents/training/mota_training_manual_2015.pdf',
      modules: [
        'Legal Framework and Provisions',
        'Claims Process and Verification',
        'Gram Sabha Functioning',
        'Appeals and Grievances',
        'Record Maintenance'
      ],
      pages: 189,
      language: 'English/Hindi',
      digitized_date: '2024-01-18',
      scan_quality: 'High',
      ocr_confidence: 0.94
    }
  ],

  // Sample Documents (Anonymized real examples)
  sample_documents: [
    {
      id: 'SAMPLE_INDIVIDUAL_CLAIM_FORM',
      title: 'Sample Individual Forest Rights Claim Form',
      type: 'Claim Form',
      description: 'Anonymized sample of completed individual claim form',
      file_url: '/documents/samples/individual_claim_form_sample.pdf',
      claim_type: 'Individual Forest Rights',
      land_area: '2.45 hectares',
      claim_status: 'Approved',
      pages: 8,
      language: 'Hindi',
      digitized_date: '2024-02-15',
      scan_quality: 'Medium',
      ocr_confidence: 0.87,
      note: 'All personal information anonymized for privacy'
    },
    {
      id: 'SAMPLE_COMMUNITY_CLAIM_FORM',
      title: 'Sample Community Forest Rights Claim Form',
      type: 'Claim Form',
      description: 'Anonymized sample of completed community claim form',
      file_url: '/documents/samples/community_claim_form_sample.pdf',
      claim_type: 'Community Forest Rights',
      area_claimed: '156.78 hectares',
      beneficiary_families: 234,
      claim_status: 'Under Review',
      pages: 12,
      language: 'Hindi/Odia',
      digitized_date: '2024-02-18',
      scan_quality: 'Good',
      ocr_confidence: 0.89,
      note: 'Community and personal details anonymized'
    }
  ],
  
  // Working Community Documents and Cooperative Records
  working_community_documents: [
    {
      id: 'WCD_TRIBAL_COOPERATIVE_SOCIETY_RECORDS',
      title: 'Tribal Primary Agricultural Credit Society Records (1985-2020)',
      type: 'Cooperative Records',
      year_range: '1985-2020',
      authority: 'Tribal Cooperative Development Corporation',
      description: 'Records of tribal cooperative societies involved in forest produce collection and marketing',
      file_url: '/documents/working_communities/tribal_cooperative_records/',
      societies_covered: 45,
      member_families: 12345,
      forest_produce_collected: [
        'Tendu leaves', 'Mahua flowers', 'Sal seeds', 'Bamboo', 'Honey', 'Medicinal plants'
      ],
      annual_turnover: '₹15.6 crores (2019-20)',
      villages_benefited: 234,
      pages: 456,
      language: 'Hindi/English',
      digitized_date: '2024-01-20',
      scan_quality: 'Good',
      ocr_confidence: 0.85
    },
    {
      id: 'WCD_VAN_SURAKSHA_COMMITTEE_MINUTES',
      title: 'Van Suraksha Committee Meeting Minutes and Resolutions (2010-2023)',
      type: 'Committee Records',
      year_range: '2010-2023',
      authority: 'Village Forest Committees',
      description: 'Meeting minutes and resolutions of community-based forest protection committees',
      file_url: '/documents/working_communities/van_suraksha_minutes/',
      committees_covered: 156,
      meetings_documented: 2345,
      forest_area_protected: '67,890 hectares',
      conservation_initiatives: [
        'Community patrolling schedules',
        'Fire prevention measures',
        'Wildlife protection protocols',
        'Encroachment prevention',
        'Sustainable harvesting guidelines'
      ],
      successful_prosecutions: 89,
      pages: 1234,
      language: 'Hindi/Local dialects',
      digitized_date: '2024-02-10',
      scan_quality: 'Variable',
      ocr_confidence: 0.76
    },
    {
      id: 'WCD_NTFP_COLLECTION_LICENSES',
      title: 'Non-Timber Forest Produce Collection Licenses and Agreements',
      type: 'License Records',
      year_range: '2006-2023',
      authority: 'State Forest Departments',
      description: 'Individual and community licenses for NTFP collection with terms and conditions',
      file_url: '/documents/working_communities/ntfp_licenses/',
      individual_licenses: 23456,
      community_licenses: 567,
      licensed_collectors: 78901,
      ntfp_varieties_covered: [
        'Tendu leaves', 'Beedi leaves', 'Mahua', 'Char seeds', 'Bamboo',
        'Honey', 'Medicinal herbs', 'Gums and resins', 'Wild fruits'
      ],
      annual_collection_value: '₹234 crores',
      pages: 3456,
      language: 'Hindi/English',
      digitized_date: '2024-01-30',
      scan_quality: 'Good',
      ocr_confidence: 0.88
    },
    {
      id: 'WCD_SELF_HELP_GROUP_RECORDS',
      title: 'Tribal Women Self Help Group Activity Records',
      type: 'SHG Records',
      year_range: '2005-2023',
      authority: 'District Rural Development Agencies',
      description: 'Records of tribal women SHGs involved in forest-based livelihood activities',
      file_url: '/documents/working_communities/shg_records/',
      shgs_documented: 1234,
      women_members: 34567,
      forest_based_enterprises: [
        'NTFP processing units',
        'Bamboo craft cooperatives',
        'Medicinal plant cultivation',
        'Honey production groups',
        'Organic farming collectives'
      ],
      total_loan_disbursed: '₹45.6 crores',
      successful_enterprises: 789,
      pages: 567,
      language: 'Hindi/Local languages',
      digitized_date: '2024-02-05',
      scan_quality: 'Good',
      ocr_confidence: 0.83
    },
    {
      id: 'WCD_JOINT_FOREST_MANAGEMENT_AGREEMENTS',
      title: 'Joint Forest Management Committee Agreements and Benefit Sharing',
      type: 'JFM Agreements',
      year_range: '1990-2023',
      authority: 'State Forest Departments',
      description: 'Formal agreements between forest departments and communities for joint forest management',
      file_url: '/documents/working_communities/jfm_agreements/',
      jfm_committees: 456,
      forest_area_under_jfm: '1,23,456 hectares',
      participating_villages: 789,
      benefit_sharing_arrangements: [
        'Timber sale proceeds (20-25%)',
        'NTFP collection rights',
        'Employment in forest works',
        'Grazing permissions',
        'Fuel wood collection rights'
      ],
      total_benefits_shared: '₹78.9 crores',
      pages: 890,
      language: 'Hindi/English',
      digitized_date: '2024-01-15',
      scan_quality: 'High',
      ocr_confidence: 0.92
    },
    {
      id: 'WCD_COMMUNITY_FOREST_RESOURCE_MANAGEMENT_PLANS',
      title: 'Community Forest Resource Management Plans',
      type: 'Management Plans',
      year_range: '2008-2023',
      authority: 'Gram Sabhas and Forest Departments',
      description: 'Community-developed plans for sustainable management of forest resources',
      file_url: '/documents/working_communities/cfr_management_plans/',
      villages_with_plans: 234,
      forest_area_planned: '56,789 hectares',
      management_objectives: [
        'Biodiversity conservation',
        'Sustainable NTFP harvesting',
        'Watershed management',
        'Wildlife habitat protection',
        'Carbon sequestration'
      ],
      implementation_success_rate: '78%',
      pages: 1456,
      language: 'Hindi/Local languages/English',
      digitized_date: '2024-02-20',
      scan_quality: 'Good',
      ocr_confidence: 0.86
    }
  ],
  
  // Tribal Land Classification Documents
  tribal_land_classification: [
    {
      id: 'TLC_SCHEDULED_AREA_SURVEY_1996',
      title: 'Fifth Schedule Area Survey and Tribal Land Classification',
      type: 'Land Survey',
      year: 1996,
      authority: 'Tribal Affairs Ministry',
      description: 'Comprehensive survey classifying tribal lands in Fifth Schedule areas',
      file_url: '/documents/land_classification/scheduled_area_survey_1996.pdf',
      scheduled_areas_covered: 10,
      total_survey_area: '24,56,789 hectares',
      land_classifications: {
        'Individual Holdings': '12,34,567 hectares',
        'Community Land': '8,76,543 hectares',
        'Forest Land under FRA': '3,45,679 hectares'
      },
      tribal_population_covered: 1234567,
      villages_surveyed: 4567,
      pages: 2345,
      language: 'Hindi/English',
      digitized_date: '2023-12-10',
      scan_quality: 'Medium',
      ocr_confidence: 0.82
    },
    {
      id: 'TLC_TRADITIONAL_OCCUPATION_DOCUMENTATION',
      title: 'Traditional Occupation and Land Use Pattern Documentation',
      type: 'Ethnographic Study',
      year_range: '2015-2020',
      authority: 'Anthropological Survey of India',
      description: 'Documentation of traditional land use and occupation patterns of forest-dwelling communities',
      file_url: '/documents/land_classification/traditional_occupation_study/',
      communities_studied: 45,
      traditional_occupations: [
        'Shifting cultivation (Jhum)',
        'NTFP collection and processing',
        'Traditional hunting and gathering',
        'Sacred grove maintenance',
        'Traditional healing practices'
      ],
      land_use_categories: [
        'Cultivation land',
        'Grazing areas',
        'Collection zones',
        'Sacred spaces',
        'Settlement areas'
      ],
      families_documented: 8901,
      area_documented: '1,23,456 hectares',
      pages: 567,
      language: 'Hindi/English/Local dialects',
      digitized_date: '2024-01-25',
      scan_quality: 'High',
      ocr_confidence: 0.89
    }
  ]
};

// Document Statistics and Metadata
const DOCUMENT_STATISTICS = {
  total_documents: 178,
  total_pages: 67890,
  digitization_progress: {
    completed: 134,
    in_progress: 32,
    pending: 12
  },
  by_category: {
    legal_framework: 15,
    state_documents: 89,
    historical_records: 34,
    court_judgments: 23,
    government_orders: 12,
    research_studies: 5,
    working_community_documents: 6,
    tribal_land_classification: 2,
    sample_documents: 2
  },
  by_state: {
    madhya_pradesh: 25,
    chhattisgarh: 23,
    tripura: 18,
    odisha: 15,
    telangana: 12,
    jharkhand: 8,
    pan_india: 77
  },
  by_language: {
    english: 89,
    hindi: 65,
    bengali: 12,
    odia: 8,
    telugu: 4,
    local_dialects: 18,
    multilingual: 34
  },
  ocr_quality: {
    high: 89,
    medium: 72,
    poor: 17
  },
  digitization_timeline: {
    '2023': 67,
    '2024': 111
  },
  community_data_coverage: {
    tribal_communities_documented: 67,
    working_cooperatives: 45,
    self_help_groups: 1234,
    joint_forest_committees: 456,
    forest_area_covered: '45,67,890 hectares',
    beneficiary_families: 678901
  },
  land_classification_data: {
    individual_holdings: '12,34,567 hectares',
    community_lands: '8,76,543 hectares',
    forest_rights_recognized: '15,45,678 hectares',
    villages_with_cfr: 801,
    scheduled_areas_covered: 10
  }
};

// Search and Filter Functions
const searchDocuments = (query, filters = {}) => {
  // Mock search implementation
  const allDocuments = [];
  
  // Flatten all document categories
  Object.values(FRA_HISTORICAL_DOCUMENTS).forEach(category => {
    if (Array.isArray(category)) {
      allDocuments.push(...category);
    } else if (typeof category === 'object') {
      Object.values(category).forEach(subCategory => {
        if (Array.isArray(subCategory)) {
          allDocuments.push(...subCategory);
        }
      });
    }
  });
  
  return allDocuments.filter(doc => {
    // Text search
    if (query) {
      const searchText = `${doc.title} ${doc.description} ${doc.type}`.toLowerCase();
      if (!searchText.includes(query.toLowerCase())) {
        return false;
      }
    }
    
    // Apply filters
    if (filters.type && doc.type !== filters.type) return false;
    if (filters.year && doc.year !== filters.year) return false;
    if (filters.authority && doc.authority !== filters.authority) return false;
    if (filters.language && doc.language !== filters.language) return false;
    
    return true;
  });
};

module.exports = {
  FRA_HISTORICAL_DOCUMENTS,
  DOCUMENT_STATISTICS,
  searchDocuments
};
