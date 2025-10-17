// SIH 2024 Demo Data - FRA Atlas & WebGIS Decision Support System
// Realistic data for Madhya Pradesh, Tripura, Odisha, Telangana
// Generated for demonstration purposes with actual geographic references

const SIH_2024_DEMO_DATA = {
  // Project metadata
  project_info: {
    title: "AI-powered FRA Atlas and WebGIS-based Decision Support System",
    target_states: ["Madhya Pradesh", "Tripura", "Odisha", "Telangana"],
    implementation_year: "2024",
    ministry: "Ministry of Tribal Affairs (MoTA)",
    last_updated: new Date().toISOString()
  },

  // State-wise comprehensive data
  states: {
    madhya_pradesh: {
      state_code: "MP",
      capital: "Bhopal",
      total_area: "308,245 sq km",
      forest_area: "94,689 sq km",
      forest_percentage: "30.72%",
      tribal_population: 15316784,
      tribal_percentage: "21.1%",
      
      // Major tribal districts with actual coordinates
      districts: [
        {
          name: "Dindori",
          coordinates: [22.9425, 81.0837],
          tribal_population: 705476,
          forest_coverage: "68.2%",
          major_tribes: ["Baiga", "Gond", "Korku"],
          fra_status: {
            claims_received: 45678,
            ifr_approved: 28934,
            cfr_approved: 234,
            area_distributed: "67,890 hectares"
          }
        },
        {
          name: "Mandla", 
          coordinates: [22.5937, 80.3711],
          tribal_population: 879234,
          forest_coverage: "71.8%",
          major_tribes: ["Gond", "Baiga", "Kol"],
          fra_status: {
            claims_received: 56789,
            ifr_approved: 34567,
            cfr_approved: 178,
            area_distributed: "89,234 hectares"
          }
        },
        {
          name: "Balaghat",
          coordinates: [21.8047, 80.1862],
          tribal_population: 567890,
          forest_coverage: "65.4%", 
          major_tribes: ["Gond", "Bhumia", "Halba"],
          fra_status: {
            claims_received: 34567,
            ifr_approved: 23456,
            cfr_approved: 145,
            area_distributed: "56,789 hectares"
          }
        }
      ],

      // Sample villages with real coordinates
      sample_villages: [
        {
          village_name: "Karanjia",
          district: "Dindori",
          coordinates: [22.9847, 81.1234],
          population: 1245,
          tribal_families: 198,
          dominant_tribe: "Baiga",
          forest_area: "2,345 hectares",
          claims_status: {
            total_claims: 178,
            approved_claims: 134,
            pending_claims: 32,
            rejected_claims: 12
          },
          satellite_analysis: {
            forest_cover: "78.5%",
            ndvi_average: 0.72,
            degradation_risk: "Low",
            biodiversity_index: 8.4
          }
        },
        {
          village_name: "Bamhni Banjar",
          district: "Mandla", 
          coordinates: [22.6234, 80.4567],
          population: 2156,
          tribal_families: 345,
          dominant_tribe: "Gond",
          forest_area: "3,456 hectares",
          claims_status: {
            total_claims: 298,
            approved_claims: 234,
            pending_claims: 45,
            rejected_claims: 19
          },
          satellite_analysis: {
            forest_cover: "82.1%",
            ndvi_average: 0.78,
            degradation_risk: "Very Low", 
            biodiversity_index: 8.9
          }
        }
      ]
    },

    tripura: {
      state_code: "TR",
      capital: "Agartala",
      total_area: "10,486 sq km",
      forest_area: "6,294 sq km",
      forest_percentage: "60.02%", 
      tribal_population: 1166813,
      tribal_percentage: "31.8%",

      districts: [
        {
          name: "North Tripura",
          coordinates: [24.1747, 92.1763], 
          tribal_population: 345678,
          forest_coverage: "75.6%",
          major_tribes: ["Tripuri", "Reang", "Jamatia", "Chakma"],
          fra_status: {
            claims_received: 12345,
            ifr_approved: 8934,
            cfr_approved: 67,
            area_distributed: "15,678 hectares"
          }
        },
        {
          name: "Dhalai",
          coordinates: [23.8572, 91.8615],
          tribal_population: 234567,
          forest_coverage: "68.9%",
          major_tribes: ["Tripuri", "Halam", "Chakma"],
          fra_status: {
            claims_received: 9876,
            ifr_approved: 6543,
            cfr_approved: 45,
            area_distributed: "12,345 hectares"
          }
        }
      ],

      sample_villages: [
        {
          village_name: "Kanchanpur",
          district: "North Tripura",
          coordinates: [24.2145, 92.2367],
          population: 876,
          tribal_families: 145,
          dominant_tribe: "Tripuri",
          forest_area: "1,234 hectares",
          claims_status: {
            total_claims: 98,
            approved_claims: 67,
            pending_claims: 23,
            rejected_claims: 8
          },
          satellite_analysis: {
            forest_cover: "69.8%",
            ndvi_average: 0.74,
            degradation_risk: "Medium",
            biodiversity_index: 7.8
          }
        }
      ]
    },

    odisha: {
      state_code: "OD",
      capital: "Bhubaneswar", 
      total_area: "155,707 sq km",
      forest_area: "50,354 sq km",
      forest_percentage: "32.35%",
      tribal_population: 9590756,
      tribal_percentage: "22.8%",

      districts: [
        {
          name: "Rayagada",
          coordinates: [19.1617, 83.4128],
          tribal_population: 789456,
          forest_coverage: "45.7%",
          major_tribes: ["Kondh", "Paraja", "Gadaba", "Santhal"],
          fra_status: {
            claims_received: 34567,
            ifr_approved: 23456,
            cfr_approved: 156,
            area_distributed: "45,678 hectares"
          }
        },
        {
          name: "Koraput",
          coordinates: [18.8120, 82.7060],
          tribal_population: 567890,
          forest_coverage: "52.3%",
          major_tribes: ["Kandha", "Paroja", "Gadaba", "Bonda"],
          fra_status: {
            claims_received: 28934,
            ifr_approved: 19876,
            cfr_approved: 134,
            area_distributed: "38,567 hectares"
          }
        },
        {
          name: "Mayurbhanj",
          coordinates: [21.9287, 86.7347],
          tribal_population: 1234567,
          forest_coverage: "58.9%",
          major_tribes: ["Santhal", "Kolha", "Bhumij", "Ho"],
          fra_status: {
            claims_received: 56789,
            ifr_approved: 39876,
            cfr_approved: 289,
            area_distributed: "67,890 hectares"
          }
        }
      ],

      sample_villages: [
        {
          village_name: "Niyamgiri",
          district: "Rayagada",
          coordinates: [19.2345, 83.4567],
          population: 1567,
          tribal_families: 234,
          dominant_tribe: "Dongria Kondh",
          forest_area: "4,567 hectares",
          claims_status: {
            total_claims: 156,
            approved_claims: 123,
            pending_claims: 28,
            rejected_claims: 5
          },
          satellite_analysis: {
            forest_cover: "87.3%",
            ndvi_average: 0.81,
            degradation_risk: "Very Low",
            biodiversity_index: 9.2
          },
          special_status: "Sacred Grove Protection Area"
        }
      ]
    },

    telangana: {
      state_code: "TS", 
      capital: "Hyderabad",
      total_area: "112,077 sq km",
      forest_area: "24,000 sq km",
      forest_percentage: "21.4%",
      tribal_population: 3156694,
      tribal_percentage: "9.34%",

      districts: [
        {
          name: "Adilabad",
          coordinates: [19.6670, 78.5270],
          tribal_population: 456789,
          forest_coverage: "35.8%",
          major_tribes: ["Gond", "Kolam", "Pardhi", "Thothi"],
          fra_status: {
            claims_received: 23456,
            ifr_approved: 16789,
            cfr_approved: 98,
            area_distributed: "28,934 hectares"
          }
        },
        {
          name: "Khammam",
          coordinates: [17.2473, 80.1514],
          tribal_population: 234567,
          forest_coverage: "28.9%", 
          major_tribes: ["Koya", "Gond", "Lambadi"],
          fra_status: {
            claims_received: 18934,
            ifr_approved: 12456,
            cfr_approved: 67,
            area_distributed: "21,678 hectares"
          }
        }
      ],

      sample_villages: [
        {
          village_name: "Utnoor",
          district: "Adilabad",
          coordinates: [19.7234, 78.6789],
          population: 2134,
          tribal_families: 298,
          dominant_tribe: "Gond",
          forest_area: "3,456 hectares",
          claims_status: {
            total_claims: 234,
            approved_claims: 189,
            pending_claims: 34,
            rejected_claims: 11
          },
          satellite_analysis: {
            forest_cover: "62.4%",
            ndvi_average: 0.69,
            degradation_risk: "Medium",
            biodiversity_index: 7.6
          }
        }
      ]
    }
  },

  // Sample FRA Claims with realistic data
  sample_fra_claims: [
    {
      claim_id: "MP/DIN/2024/001234",
      applicant: {
        name: "Ramesh Baiga",
        age: 45,
        tribe: "Baiga",
        family_members: 6,
        occupation: "Forest dweller, NTFP collector"
      },
      location: {
        state: "Madhya Pradesh",
        district: "Dindori", 
        village: "Karanjia",
        coordinates: [22.9847, 81.1234],
        survey_number: "123/2A"
      },
      land_details: {
        claimed_area: "2.5 hectares",
        land_type: "Forest land",
        current_use: "Agriculture and dwelling",
        occupation_since: "1987"
      },
      status: {
        current_status: "Approved",
        approval_date: "2024-02-15",
        patta_number: "MP-FRA-2024-001234",
        processing_days: 145
      },
      documents_submitted: [
        "Tribal certificate",
        "Village residence proof", 
        "Land occupation evidence",
        "Community verification letter"
      ],
      satellite_verification: {
        ndvi_score: 0.75,
        forest_cover: "65.8%",
        land_use_classification: "Mixed forest-agriculture",
        change_detection: "Stable land use since 2010"
      }
    },
    {
      claim_id: "TR/NT/2024/005678", 
      applicant: {
        name: "Bijoy Tripura",
        age: 52,
        tribe: "Tripuri",
        family_members: 8,
        occupation: "Jhum cultivation, Bamboo crafts"
      },
      location: {
        state: "Tripura",
        district: "North Tripura",
        village: "Kanchanpur", 
        coordinates: [24.2145, 92.2367],
        survey_number: "67/1B"
      },
      land_details: {
        claimed_area: "1.8 hectares",
        land_type: "Forest land",
        current_use: "Jhum cultivation",
        occupation_since: "1992"
      },
      status: {
        current_status: "Under Review",
        submitted_date: "2024-01-20",
        expected_decision: "2024-04-15",
        processing_days: 85
      }
    }
  ],

  // CSS Schemes Integration Data
  css_schemes: {
    pm_kisan: {
      scheme_name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      eligibility_criteria: "Small and marginal farmers owning cultivable land",
      benefit: "₹6,000 per year in three installments",
      fra_integration: {
        eligible_patta_holders: 145678,
        enrolled_beneficiaries: 89456,
        pending_enrollments: 34567,
        annual_disbursement: "₹53.67 crores"
      }
    },
    jal_jeevan_mission: {
      scheme_name: "Jal Jeevan Mission",
      objective: "Functional Household Tap Connection to every household",
      fra_integration: {
        tribal_villages_covered: 2345,
        tap_connections_provided: 189456,
        quality_testing_labs: 45,
        water_source_sustainability: "89% groundwater, 11% surface water"
      }
    },
    mgnrega: {
      scheme_name: "Mahatma Gandhi National Rural Employment Guarantee Act",
      fra_integration: {
        job_cards_issued: 234567,
        person_days_generated: "4.56 crore",
        average_wage_rate: "₹220/day",
        natural_resource_management: "45% of total works",
        forest_related_works: "12,345 projects"
      }
    }
  },

  // Satellite Analysis Templates with Real Coordinates
  satellite_analysis_samples: [
    {
      location: "Dindori District, MP",
      coordinates: [22.9425, 81.0837],
      analysis_date: "2024-03-15",
      data_source: "Sentinel-2",
      metrics: {
        ndvi: 0.78,
        evi: 0.65,
        forest_cover_percentage: 71.2,
        land_surface_temperature: 28.5,
        soil_moisture: 0.34,
        biomass_estimate: "145.6 tons/hectare"
      },
      land_classification: {
        "Dense Forest": 45.6,
        "Open Forest": 25.4,
        "Agricultural Land": 15.8,
        "Grassland": 8.9,
        "Water Bodies": 3.2,
        "Built-up": 1.1
      },
      change_detection: {
        period: "2020-2024",
        forest_gain: "+2.1%",
        forest_loss: "-0.8%",
        net_change: "+1.3%",
        major_changes: "Reforestation in 23 hectares"
      }
    },
    {
      location: "Rayagada District, Odisha", 
      coordinates: [19.1617, 83.4128],
      analysis_date: "2024-03-10",
      data_source: "Landsat 8",
      metrics: {
        ndvi: 0.82,
        evi: 0.71,
        forest_cover_percentage: 78.9,
        land_surface_temperature: 26.8,
        soil_moisture: 0.42,
        biomass_estimate: "167.8 tons/hectare"
      },
      land_classification: {
        "Dense Forest": 56.8,
        "Open Forest": 22.1,
        "Agricultural Land": 12.4,
        "Grassland": 5.6,
        "Water Bodies": 2.3,
        "Built-up": 0.8
      }
    }
  ],

  // Decision Support System Sample Data
  decision_support_samples: [
    {
      claim_id: "MP/DIN/2024/001234",
      ai_analysis: {
        viability_score: 8.7,
        confidence_level: 0.92,
        risk_factors: ["Low", "Medium", "Low"], 
        recommendation: "APPROVE",
        processing_priority: "High",
        estimated_processing_time: "45 days"
      },
      compliance_check: {
        fra_2006_compliance: "Full Compliance",
        state_rules_compliance: "Compliant",
        environmental_clearance: "Not Required",
        forest_clearance: "Required - Stage 1"
      },
      scheme_eligibility: {
        pm_kisan: "Eligible",
        jal_jeevan_mission: "Eligible",
        mgnrega: "Eligible",
        pradhan_mantri_awas_yojana: "Eligible"
      }
    }
  ],

  // Performance Metrics for Analytics Dashboard
  performance_metrics: {
    overall_stats: {
      total_claims_received: 1456789,
      total_claims_processed: 1234567,
      processing_efficiency: "84.7%",
      average_processing_time: "156 days",
      total_area_distributed: "23,45,678 hectares",
      beneficiary_families: 567890
    },
    state_wise_performance: {
      madhya_pradesh: {
        efficiency_score: 87.2,
        processing_time: "142 days",
        approval_rate: "76.8%"
      },
      tripura: {
        efficiency_score: 82.4,
        processing_time: "168 days", 
        approval_rate: "71.2%"
      },
      odisha: {
        efficiency_score: 85.6,
        processing_time: "151 days",
        approval_rate: "74.5%"
      },
      telangana: {
        efficiency_score: 78.9,
        processing_time: "189 days",
        approval_rate: "68.9%"
      }
    }
  },

  // Generate timestamp for demo freshness
  generated_at: new Date().toISOString(),
  version: "SIH-2024-Demo-v1.0"
};

module.exports = SIH_2024_DEMO_DATA;